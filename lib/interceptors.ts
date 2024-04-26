/** @format */

import { filterNone } from '@yd/utils';
import { RequestConfig, Response } from '../types';
import { log } from './utils';

export class Interceptor<I extends Function> {
    private interceptors = new Set<I>();
    public use = (interceptor: I) => this.interceptors.add(interceptor);
    public async notify<P>(params: P) {
        for (const interceptor of this.interceptors) {
            params = await interceptor(params);
        }
        return params;
    }
}
export const requestInterceptor = async ({
    query,
    headers,
    onHeader,
    baseURL,
    url,
    ...config
}: RequestConfig) => {
    baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    url = url.startsWith('/') ? url.slice(1) : url;
    return {
        ...config,
        onHeader,
        baseURL,
        url: `${baseURL}/${url}`,
        headers: filterNone(await onHeader!(headers!)),
        query: filterNone(query)
    };
};
export const responseInterceptor = async (response: Response) => {
    const {
        status,
        data: { code }
    } = response;
    if (status >= 400 || code !== 0) {
        return Promise.reject(response);
    }
    log('Success', response);
    return response;
};
