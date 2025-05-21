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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
var interceptors_1 = require("./interceptors");
var utils_1 = require("./utils");
var utils_2 = require("@yd/utils");
var Request = (function () {
    function Request(config) {
        var _this = this;
        this.config = utils_1.defaultConfig;
        this.interceptors = {
            request: new interceptors_1.Interceptor(),
            response: new interceptors_1.Interceptor()
        };
        this.get = function (url, params, config) { return _this.onRequest('GET', url, params, config); };
        this.post = function (url, params, config) {
            return _this.onRequest('POST', url, params, config);
        };
        this.put = function (url, params, config) { return _this.onRequest('PUT', url, params, config); };
        this.del = function (url, params, config) {
            return _this.onRequest('DELETE', url, params, config);
        };
        Object.assign(this.config, config);
    }
    Request.prototype.onRequest = function (method_1, url_1) {
        return __awaiter(this, arguments, void 0, function (method, url, params, config) {
            var _a, c, _b, request, response, replaceUrlParams, mergeParams, errorHandler, u, _c, _d, disable, formatData, res, _e, _f, data, response_1;
            if (params === void 0) { params = {}; }
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = this, c = _a.config, _b = _a.interceptors, request = _b.request, response = _b.response, replaceUrlParams = _a.replaceUrlParams, mergeParams = _a.mergeParams, errorHandler = _a.errorHandler;
                        config = __assign(__assign({ method: method, url: url }, c), config);
                        u = config.url, _c = config.logProps, _d = _c === void 0 ? {} : _c, disable = _d.disable, formatData = config.formatData;
                        !disable && console.time(u);
                        params = (0, utils_2.deepClone)(params);
                        config.url = replaceUrlParams(u, params);
                        return [4, mergeParams(params, config)];
                    case 1:
                        _g.sent();
                        return [4, request.notify(config, true)];
                    case 2:
                        config = _g.sent();
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 7, , 8]);
                        return [4, config.adapter(config)];
                    case 4:
                        res = _g.sent();
                        return [4, response.notify(res)];
                    case 5:
                        _e = (_g.sent()).data, _f = _e === void 0 ? {} : _e, data = _f.data;
                        return [4, formatData(data)];
                    case 6:
                        data = _g.sent();
                        !disable && console.timeEnd(u);
                        return [2, data];
                    case 7:
                        response_1 = _g.sent();
                        errorHandler(response_1);
                        !disable && console.timeEnd(u);
                        return [2, Promise.reject(response_1)];
                    case 8: return [2];
                }
            });
        });
    };
    Request.prototype.replaceUrlParams = function (url, params) {
        return url.replace(/\{(\w+)}/g, function (_, key) {
            if (!Reflect.has(params, key)) {
                return key;
            }
            var value = Reflect.get(params, key);
            delete params[key];
            return value;
        });
    };
    Request.prototype.mergeParams = function (params, config) {
        return __awaiter(this, void 0, void 0, function () {
            var method, query, body, formatParams, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        method = config.method, query = config.query, body = config.body, formatParams = config.formatParams;
                        if (!(method === 'GET' || method === 'DELETE')) return [3, 2];
                        _a = config;
                        return [4, formatParams(query ? Object.assign(query, params) : params)];
                    case 1:
                        _a.query = _c.sent();
                        return [3, 4];
                    case 2:
                        _b = config;
                        return [4, formatParams(body ? Object.assign(body, params) : params)];
                    case 3:
                        _b.body = _c.sent();
                        _c.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    Request.prototype.errorHandler = function (response) {
        var status = response.status, data = response.data, _a = response.config, authCode = _a.authCode, toast = _a.toast, onLogout = _a.onLogout, onError = _a.onError;
        var res = authCode.find(function (_a) {
            var code = _a.code;
            return code === status || code === (data === null || data === void 0 ? void 0 : data.code);
        });
        if (res) {
            onLogout(response);
            onError(__assign(__assign({}, response), res));
        }
        else {
            toast && onError(response);
        }
        (0, utils_1.log)('Fail', response);
    };
    return Request;
}());
exports.Request = Request;
