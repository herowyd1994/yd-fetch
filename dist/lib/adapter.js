var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default (config) => __awaiter(void 0, void 0, void 0, function* () {
    const { method, headers, transformRequestUrl, transformRequestBody } = config;
    const res = yield fetch(transformRequestUrl(config), {
        method,
        headers,
        body: transformRequestBody(config)
    });
    const { status, statusText } = res;
    try {
        const data = yield res.json();
        const { code, msg } = data;
        data.code = code !== null && code !== void 0 ? code : status;
        return Object.assign(Object.assign({}, res), { status,
            data, errMsg: msg !== null && msg !== void 0 ? msg : statusText, config });
    }
    catch ({ message }) {
        return Promise.reject(Object.assign(Object.assign({}, res), { errMsg: message !== null && message !== void 0 ? message : statusText, config }));
    }
});
