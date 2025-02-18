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
    async onRequest(method, url, params = {}, config) {
        const { config: c, interceptors: { request, response }, replaceUrlParams, mergeParams, errorHandler } = this;
        config = { method, url, ...c, ...config };
        const { url: u, logProps: { disable } = {}, formatData } = config;
        !disable && console.time(u);
        params = deepClone(params);
        config.url = replaceUrlParams(u, params);
        await mergeParams(params, config);
        config = await request.notify(config, true);
        try {
            const res = await config.adapter(config);
            let { data: { data } = {} } = await response.notify(res);
            data = await formatData(data);
            !disable && console.timeEnd(u);
            return data;
        }
        catch (response) {
            errorHandler(response);
            !disable && console.timeEnd(u);
            return Promise.reject(response);
        }
    }
    replaceUrlParams(url, params) {
        return url.replace(/\{(\w+)\}/g, (_, key) => {
            if (!Reflect.has(params, key)) {
                return key;
            }
            const value = Reflect.get(params, key);
            delete params[key];
            return value;
        });
    }
    async mergeParams(params, config) {
        const { method, query, body, formatParams } = config;
        if (method === 'GET' || method === 'DELETE') {
            config.query = await formatParams(query ? Object.assign(query, params) : params);
        }
        else {
            config.body = await formatParams(body ? Object.assign(body, params) : params);
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
