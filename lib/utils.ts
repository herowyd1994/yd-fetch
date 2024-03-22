/** @format */

import { transformUrlParams, isNone } from '@yd/utils';
import { Config, Response } from '../types';
import adapter from './adapter';

export const defaultConfig: Config = {
    baseURL: '',
    headers: { 'Content-Type': 'application/json' },
    authorizationCode: [401, 402, 403],
    toast: true,
    adapter,
    onHeader: (headers) =>
        Object.assign(headers, { Authorization: localStorage.getItem('Authorization') }),
    onError: ({ errMsg }) => alert(errMsg),
    onLogout: () => localStorage.removeItem('Authorization'),
    transformRequestUrl: ({ url, query = {} }) => `${url}${transformUrlParams(query)}`,
    transformRequestBody: ({ body }) => (body ? JSON.stringify(body) : body)
};
export const log = (
    status: 'Success' | 'Fail',
    {
        errMsg,
        data,
        config: {
            url,
            method,
            logProps: { color = '#C73737', disable, handler } = {},
            query,
            body,
            headers
        }
    }: Response
) => {
    if (disable) {
        return;
    }
    console.group(`${status}【${method}】请求接口：${url}`);
    !isNone(query) && console.log('%cquery', `color:${color}`, query);
    !isNone(body) && console.log('%cbody', `color:${color}`, body);
    const value = data?.data ?? data ?? errMsg;
    console.log(...(typeof value === 'object' ? [value] : [`%c${value}`, `color:${color};`]));
    handler?.();
    console.groupEnd();
};
