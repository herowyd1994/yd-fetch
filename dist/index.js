import { Request } from './lib/request';
import { defaultConfig } from './lib/utils';
import { requestInterceptor, responseInterceptor } from './lib/interceptors';
let fetch;
export const createFetch = (config) => {
    const instance = new Request(config);
    instance.interceptors.request.use(requestInterceptor);
    instance.interceptors.response.use(responseInterceptor);
    return (fetch = Object.assign(({ method, url, ...opts }) => instance[method === 'delete' ? 'del' : method](url, void 0, { ...config, ...opts }), instance));
};
export const useFetch = () => {
    const methods = ['get', 'post', 'put', 'del'].reduce((obj, key) => {
        const fn = async (url, params, { defaultValue, ...config } = {}) => {
            const res = await fetch[key](url, params, config);
            return defaultValue && typeof defaultValue === 'object' ?
                Object.assign(defaultValue, res)
                : res;
        };
        return { ...obj, [key]: fn };
    }, {});
    return {
        ...methods,
        fetch,
        defaultConfig
    };
};
