/** @format */

import { RequestConfig } from '../types';

export default async (config: RequestConfig) => {
    const { method, headers, transformRequestUrl, transformRequestBody } = config;
    let status: number;
    let header: Headers;
    try {
        const res = await fetch(transformRequestUrl!(config), {
            method,
            headers,
            body: transformRequestBody!(config)
        });
        const { status: s, headers: h, statusText } = res;
        status = s;
        header = h;
        const data = await res.json();
        const { code, msg, error } = data;
        data.code = code ?? s;
        data.msg = msg ?? error;
        return {
            ...res,
            statusText: statusText || data.msg,
            data,
            config
        };
    } catch (err: any) {
        return Promise.reject({ status, header, errMsg: err.message, config });
    }
};
