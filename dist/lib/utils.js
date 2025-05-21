"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.defaultConfig = void 0;
var utils_1 = require("@yd/utils");
var adapter_1 = require("./adapter");
exports.defaultConfig = {
    baseURL: '',
    headers: { 'Content-Type': 'application/json' },
    authCode: [{ code: 401, errMsg: '用户信息已过期，请重新登录' }],
    toast: true,
    adapter: adapter_1.default,
    onHeader: function (headers) {
        return Object.assign(headers, { Authorization: localStorage.getItem('Authorization') });
    },
    onError: function (_a) {
        var errMsg = _a.errMsg;
        return alert(errMsg);
    },
    onLogout: function () { return localStorage.removeItem('Authorization'); },
    transformRequestUrl: function (_a) {
        var url = _a.url, _b = _a.query, query = _b === void 0 ? {} : _b;
        return "".concat(url).concat((0, utils_1.transformUrlParams)(query));
    },
    transformRequestBody: function (_a) {
        var body = _a.body;
        return (body ? JSON.stringify(body) : body);
    },
    formatParams: function (params) { return params; },
    formatData: function (data) { return data; }
};
var log = function (status, response) {
    var _a, _b;
    var errMsg = response.errMsg, data = response.data, _c = response.config, url = _c.url, method = _c.method, _d = _c.logProps, _e = _d === void 0 ? {} : _d, _f = _e.color, color = _f === void 0 ? '#C73737' : _f, disable = _e.disable, handler = _e.handler, query = _c.query, body = _c.body;
    if (disable) {
        return;
    }
    console.groupCollapsed("".concat(status, "\u3010").concat(method.toUpperCase(), "\u3011\u8BF7\u6C42\u63A5\u53E3\uFF1A").concat(url));
    !(0, utils_1.isNone)(query) && console.log('%cquery', "color:".concat(color), query);
    !(0, utils_1.isNone)(body) && console.log('%cbody', "color:".concat(color), body);
    var value = (_b = (_a = data === null || data === void 0 ? void 0 : data.data) !== null && _a !== void 0 ? _a : data) !== null && _b !== void 0 ? _b : errMsg;
    console.log.apply(console, __spreadArray([], __read((typeof value === 'object' ? [value] : ["%c".concat(value), "color:".concat(color)])), false));
    handler === null || handler === void 0 ? void 0 : handler(response);
    console.groupEnd();
};
exports.log = log;
