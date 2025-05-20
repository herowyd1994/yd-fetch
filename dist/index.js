var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Request } from './lib/request';
import { defaultConfig } from './lib/utils';
import { requestInterceptor, responseInterceptor } from './lib/interceptors';
let fetch;
export const createFetch = (config) => {
    const instance = new Request(config);
    instance.interceptors.request.use(requestInterceptor);
    instance.interceptors.response.use(responseInterceptor);
    return (fetch = Object.assign((_a) => {
        var { method, url } = _a, opts = __rest(_a, ["method", "url"]);
        return instance[method === 'delete' ? 'del' : method](url, void 0, Object.assign(Object.assign({}, config), opts));
    }, instance));
};
export const useFetch = () => {
    const methods = ['get', 'post', 'put', 'del'].reduce((obj, key) => {
        const fn = (url_1, params_1, ...args_1) => __awaiter(void 0, [url_1, params_1, ...args_1], void 0, function* (url, params, _a = {}) {
            var { defaultValue } = _a, config = __rest(_a, ["defaultValue"]);
            const res = yield fetch[key](url, params, config);
            return defaultValue && typeof defaultValue === 'object' ?
                Object.assign(defaultValue, res)
                : res;
        });
        return Object.assign(Object.assign({}, obj), { [key]: fn });
    }, {});
    return Object.assign(Object.assign({}, methods), { fetch,
        defaultConfig });
};
