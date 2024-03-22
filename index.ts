/** @format */

import { Config, Fetch, MethodKeys, MethodFn } from './types';
import { Request } from './lib/request';
import { defaultConfig } from './lib/utils';
import { requestInterceptor, responseInterceptor } from './lib/interceptors';

let fetch: Fetch;

export const createFetch = (config: Config) => {
    const instance = new Request(config);
    instance.interceptors.request.use(requestInterceptor);
    instance.interceptors.response.use(responseInterceptor);
    fetch = (fetchConfig) => {
        const { method, url, ...opts } = fetchConfig;
        return instance[method === 'delete' ? 'del' : method](url, void 0, {
            ...config,
            ...opts
        });
    };
    return Object.assign(fetch, instance);
};
export const useFetch = () => {
    const methods = (['get', 'post', 'put', 'del'] as MethodKeys[]).reduce(
        (obj, key) => {
            const fn: MethodFn = async (url, params, { defaultValue, ...config } = {}) => {
                const res = await (fetch as Fetch & Request)[key](url, params, config);
                return defaultValue && typeof defaultValue === 'object' ?
                        Object.assign(defaultValue!, res)
                    :   res;
            };
            return { ...obj, [key]: fn };
        },
        {} as Record<MethodKeys, MethodFn>
    );
    return {
        ...methods,
        instance: fetch as Fetch & Request,
        defaultConfig
    };
};
