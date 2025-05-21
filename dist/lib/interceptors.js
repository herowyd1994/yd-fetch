"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseInterceptor = exports.requestInterceptor = exports.Interceptor = void 0;
var utils_1 = require("@yd/utils");
var utils_2 = require("./utils");
var Interceptor = (function () {
    function Interceptor() {
        this.interceptors = new Set();
    }
    Interceptor.prototype.use = function (interceptor) {
        this.interceptors.add(interceptor);
        return this;
    };
    Interceptor.prototype.notify = function (params_1) {
        return __awaiter(this, arguments, void 0, function (params, reverse) {
            var arr, arr_1, arr_1_1, interceptor, e_1_1;
            var e_1, _a;
            if (reverse === void 0) { reverse = false; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        arr = reverse ? __spreadArray([], __read(this.interceptors), false).reverse() : this.interceptors;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        arr_1 = __values(arr), arr_1_1 = arr_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!arr_1_1.done) return [3, 5];
                        interceptor = arr_1_1.value;
                        return [4, interceptor(params)];
                    case 3:
                        params = _b.sent();
                        _b.label = 4;
                    case 4:
                        arr_1_1 = arr_1.next();
                        return [3, 2];
                    case 5: return [3, 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 8];
                    case 7:
                        try {
                            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7];
                    case 8: return [2, params];
                }
            });
        });
    };
    return Interceptor;
}());
exports.Interceptor = Interceptor;
var requestInterceptor = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var _b, _c;
    var _d;
    var query = _a.query, headers = _a.headers, onHeader = _a.onHeader, baseURL = _a.baseURL, url = _a.url, config = __rest(_a, ["query", "headers", "onHeader", "baseURL", "url"]);
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
                url = url.startsWith('/') ? url.slice(1) : url;
                _b = [__assign({}, config)];
                _d = { onHeader: onHeader, baseURL: baseURL, url: "".concat(baseURL, "/").concat(url) };
                _c = utils_1.filterNone;
                return [4, onHeader(headers)];
            case 1: return [2, __assign.apply(void 0, _b.concat([(_d.headers = _c.apply(void 0, [_e.sent()]), _d.query = (0, utils_1.filterNone)(query), _d)]))];
        }
    });
}); };
exports.requestInterceptor = requestInterceptor;
var responseInterceptor = function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var status, data;
    return __generator(this, function (_a) {
        status = response.status, data = response.data;
        if (status >= 400 || data.code !== 0) {
            return [2, Promise.reject(response)];
        }
        (0, utils_2.log)('Success', response);
        return [2, response];
    });
}); };
exports.responseInterceptor = responseInterceptor;
