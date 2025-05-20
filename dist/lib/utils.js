import { transformUrlParams, isNone } from '@yd/utils';
import adapter from './adapter';
export const defaultConfig = {
    baseURL: '',
    headers: { 'Content-Type': 'application/json' },
    authCode: [{ code: 401, errMsg: '用户信息已过期，请重新登录' }],
    toast: true,
    adapter,
    onHeader: headers => Object.assign(headers, { Authorization: localStorage.getItem('Authorization') }),
    onError: ({ errMsg }) => alert(errMsg),
    onLogout: () => localStorage.removeItem('Authorization'),
    transformRequestUrl: ({ url, query = {} }) => `${url}${transformUrlParams(query)}`,
    transformRequestBody: ({ body }) => (body ? JSON.stringify(body) : body),
    formatParams: params => params,
    formatData: data => data
};
export const log = (status, response) => {
    var _a, _b;
    const { errMsg, data, config: { url, method, logProps: { color = '#C73737', disable, handler } = {}, query, body } } = response;
    if (disable) {
        return;
    }
    console.groupCollapsed(`${status}【${method.toUpperCase()}】请求接口：${url}`);
    !isNone(query) && console.log('%cquery', `color:${color}`, query);
    !isNone(body) && console.log('%cbody', `color:${color}`, body);
    const value = (_b = (_a = data === null || data === void 0 ? void 0 : data.data) !== null && _a !== void 0 ? _a : data) !== null && _b !== void 0 ? _b : errMsg;
    console.log(...(typeof value === 'object' ? [value] : [`%c${value}`, `color:${color}`]));
    handler === null || handler === void 0 ? void 0 : handler(response);
    console.groupEnd();
};
