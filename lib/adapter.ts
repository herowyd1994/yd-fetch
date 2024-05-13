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
        const { status, statusText } = res;
        const data = await res.json();
        const { code, msg } = data;
        data.code = code ?? status;
        return {
            ...res,
            data,
            status,
            errMsg: msg ?? statusText,
            config
        };
    } catch (err: any) {
        const { statusText } = res;
        return Promise.reject({
            ...res,
            errMsg: err.message ?? statusText,
            config
        });
    }
};
