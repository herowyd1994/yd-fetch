/** @format */

import { RequestConfig } from '../types';

export default async (config: RequestConfig) => {
    const { method, headers, transformRequestUrl, transformRequestBody } = config;
    const res = await fetch(transformRequestUrl!(config), {
        method,
        headers,
        body: transformRequestBody!(config)
    });
    const { status, statusText } = res;
    try {
        const data = await res.json();
        const { code, msg } = data;
        data.code = code ?? status;
        return { ...res, status, data, errMsg: msg ?? statusText, config };
    } catch ({ message }) {
        return Promise.reject({ ...res, errMsg: message ?? statusText, config });
    }
};
