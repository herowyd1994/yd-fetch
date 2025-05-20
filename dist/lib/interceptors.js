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
import { filterNone } from '@yd/utils';
import { log } from './utils';
export class Interceptor {
    constructor() {
        this.interceptors = new Set();
    }
    use(interceptor) {
        this.interceptors.add(interceptor);
        return this;
    }
    notify(params_1) {
        return __awaiter(this, arguments, void 0, function* (params, reverse = false) {
            const arr = reverse ? [...this.interceptors].reverse() : this.interceptors;
            for (const interceptor of arr) {
                params = yield interceptor(params);
            }
            return params;
        });
    }
}
export const requestInterceptor = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { query, headers, onHeader, baseURL, url } = _a, config = __rest(_a, ["query", "headers", "onHeader", "baseURL", "url"]);
    baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    url = url.startsWith('/') ? url.slice(1) : url;
    return Object.assign(Object.assign({}, config), { onHeader,
        baseURL, url: `${baseURL}/${url}`, headers: filterNone(yield onHeader(headers)), query: filterNone(query) });
});
export const responseInterceptor = (response) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, data } = response;
    if (status >= 400 || data.code !== 0) {
        return Promise.reject(response);
    }
    log('Success', response);
    return response;
});
