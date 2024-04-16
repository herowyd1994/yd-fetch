/** @format */

import { RequestConfig } from '../types';

export default async (config: RequestConfig) => {
    const { method, headers, transformRequestUrl, transformRequestBody } = config;
    let res: Response;
    try {
        res = await fetch(transformRequestUrl!(config), {
            method,
            headers,
            body: transformRequestBody!(config)
        });
        const { status, headers: h, statusText } = res;
        const data = await res.json();
        const { code, msg, error } = data;
        data.code = code ?? status;
        data.msg = msg ?? error;
        return {
            ...res,
            statusText: statusText || data.msg,
            data,
            config
        };
    } catch (err: any) {
        const { status, statusText, headers } = res;
        return Promise.reject({
            status,
            statusText: err.message ?? statusText,
            headers,
            config
        });
    }
};
