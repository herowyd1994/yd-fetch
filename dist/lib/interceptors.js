import { filterNone } from '@yd/utils';
import { log } from './utils';
export class Interceptor {
    interceptors = new Set();
    use(interceptor) {
        this.interceptors.add(interceptor);
        return this;
    }
    async notify(params) {
        for (const interceptor of this.interceptors) {
            params = await interceptor(params);
        }
        return params;
    }
}
export const requestInterceptor = async ({ query, headers, onHeader, baseURL, url, ...config }) => {
    baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    url = url.startsWith('/') ? url.slice(1) : url;
    return {
        ...config,
        onHeader,
        baseURL,
        url: `${baseURL}/${url}`,
        headers: filterNone(await onHeader(headers)),
        query: filterNone(query)
    };
};
export const responseInterceptor = async (response) => {
    const { status, data } = response;
    if (status >= 400 || data.code !== 0) {
        return Promise.reject(response);
    }
    log('Success', response);
    return response;
};
