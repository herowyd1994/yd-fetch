var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Interceptor } from './interceptors';
import { defaultConfig, log } from './utils';
import { deepClone } from '@yd/utils';
export class Request {
    constructor(config) {
        this.config = defaultConfig;
        this.interceptors = {
            request: new Interceptor(),
            response: new Interceptor()
        };
        this.get = (url, params, config) => this.onRequest('GET', url, params, config);
        this.post = (url, params, config) => this.onRequest('POST', url, params, config);
        this.put = (url, params, config) => this.onRequest('PUT', url, params, config);
        this.del = (url, params, config) => this.onRequest('DELETE', url, params, config);
        Object.assign(this.config, config);
    }
    onRequest(method_1, url_1) {
        return __awaiter(this, arguments, void 0, function* (method, url, params = {}, config) {
            const { config: c, interceptors: { request, response }, replaceUrlParams, mergeParams, errorHandler } = this;
            config = Object.assign(Object.assign({ method, url }, c), config);
            const { url: u, logProps: { disable } = {}, formatData } = config;
            !disable && console.time(u);
            params = deepClone(params);
            config.url = replaceUrlParams(u, params);
            yield mergeParams(params, config);
            config = yield request.notify(config, true);
            try {
                const res = yield config.adapter(config);
                let { data: { data } = {} } = yield response.notify(res);
                data = yield formatData(data);
                !disable && console.timeEnd(u);
                return data;
            }
            catch (response) {
                errorHandler(response);
                !disable && console.timeEnd(u);
                return Promise.reject(response);
            }
        });
    }
    replaceUrlParams(url, params) {
        return url.replace(/\{(\w+)}/g, (_, key) => {
            if (!Reflect.has(params, key)) {
                return key;
            }
            const value = Reflect.get(params, key);
            delete params[key];
            return value;
        });
    }
    mergeParams(params, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { method, query, body, formatParams } = config;
            if (method === 'GET' || method === 'DELETE') {
                config.query = yield formatParams(query ? Object.assign(query, params) : params);
            }
            else {
                config.body = yield formatParams(body ? Object.assign(body, params) : params);
            }
        });
    }
    errorHandler(response) {
        const { status, data, config: { authCode, toast, onLogout, onError } } = response;
        const res = authCode.find(({ code }) => code === status || code === (data === null || data === void 0 ? void 0 : data.code));
        if (res) {
            onLogout(response);
            onError(Object.assign(Object.assign({}, response), res));
        }
        else {
            toast && onError(response);
        }
        log('Fail', response);
    }
}
