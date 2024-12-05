import { Interceptor } from './interceptors';
import { defaultConfig, log } from './utils';
import { deepClone } from '@yd/utils';
export class Request {
    config = defaultConfig;
    interceptors = {
        request: new Interceptor(),
        response: new Interceptor()
    };
    get = (url, params, config) => this.onRequest('GET', url, params, config);
    post = (url, params, config) => this.onRequest('POST', url, params, config);
    put = (url, params, config) => this.onRequest('PUT', url, params, config);
    del = (url, params, config) => this.onRequest('DELETE', url, params, config);
    constructor(config) {
        Object.assign(this.config, config);
    }
    async onRequest(method, url, params, config) {
        const { config: c, interceptors: { request, response }, replaceUrlParams, mergeParams, errorHandler } = this;
        config = { method, url, ...c, ...config };
        const { url: u, logProps: { disable } = {} } = config;
        !disable && console.time(u);
        params = deepClone(params);
        config.url = replaceUrlParams(u, params);
        mergeParams(params, config);
        config = await request.notify(config);
        try {
            const res = await config.adapter(config);
            const { data } = await response.notify(res);
            !disable && console.timeEnd(u);
            return data.data;
        }
        catch (response) {
            errorHandler(response);
            !disable && console.timeEnd(u);
            return Promise.reject(response);
        }
    }
    replaceUrlParams(url, params = {}) {
        return url.replace(/\{(\w+)\}/g, (_, key) => {
            if (!Reflect.has(params, key)) {
                return key;
            }
            const value = Reflect.get(params, key);
            delete params[key];
            return value;
        });
    }
    mergeParams(params, config) {
        const { method, query, body } = config;
        if (method === 'GET' || method === 'DELETE') {
            config.query = query ? Object.assign(query, params) : params;
        }
        else {
            config.body = body ? Object.assign(body, params) : params;
        }
    }
    errorHandler(response) {
        const { status, data, config: { authCode, toast, onLogout, onError } } = response;
        const res = authCode.find(({ code }) => code === status || code === data?.code);
        if (res) {
            onLogout(response);
            onError({ ...response, ...res });
        }
        else {
            toast && onError(response);
        }
        log('Fail', response);
    }
}
