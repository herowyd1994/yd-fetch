/** @format */

import {
    RequestConfig,
    Config,
    RequestInterceptor,
    ResponseInterceptor,
    RequestMethod,
    Response
} from '../types';
import { Interceptor } from './interceptors';
import { defaultConfig, log } from './utils';
import { deepClone } from '@yd/utils';

export class Request {
    private config = defaultConfig;
    public interceptors = {
        request: new Interceptor<RequestInterceptor>(),
        response: new Interceptor<ResponseInterceptor>()
    };
    public get: RequestMethod = (url, params, config) => this.onRequest('GET', url, params, config);
    public post: RequestMethod = (url, params, config) =>
        this.onRequest('POST', url, params, config);
    public put: RequestMethod = (url, params, config) => this.onRequest('PUT', url, params, config);
    public del: RequestMethod = (url, params, config) =>
        this.onRequest('DELETE', url, params, config);
    constructor(config?: Config) {
        Object.assign(this.config, config);
    }
    private async onRequest<D>(
        method: RequestConfig['method'],
        url: string,
        params?: Record<string, any>,
        config?: Partial<RequestConfig>
    ): Promise<D> {
        const {
            config: c,
            interceptors: { request, response },
            replaceUrlParams,
            mergeParams,
            errorHandler
        } = this;
        config = { method, url, ...c, ...config };
        const { url: u, logProps: { disable } = {} } = config;
        !disable && console.time(u);
        params = deepClone(params);
        config.url = replaceUrlParams(u!, params);
        mergeParams(method, params, config);
        config = await request.notify(config);
        try {
            const res = await config.adapter!<D>(config as RequestConfig);
            const { data } = await response.notify(res);
            !disable && console.timeEnd(u);
            return data!.data!;
        } catch (response: any) {
            errorHandler(response);
            !disable && console.timeEnd(u);
            return Promise.reject(response);
        }
    }
    private replaceUrlParams(url: string, params: Record<string, any> = {}) {
        return url.replace(/\{(\w+)\}/g, (_, key) => {
            if (!Reflect.has(params, key)) {
                return key;
            }
            const value = Reflect.get(params, key);
            delete params[key];
            return value;
        });
    }
    private mergeParams(
        method: RequestConfig['method'],
        params: Record<string, any> | undefined,
        config: Partial<RequestConfig>
    ) {
        const { query, body } = config;
        if (method === 'GET' || method === 'DELETE') {
            config.query = query ? Object.assign(query, params) : params;
        } else {
            config.body = body ? Object.assign(body, params) : params;
        }
    }
    private errorHandler(response: Response) {
        const {
            status,
            data,
            config: { authCode, toast, onLogout, onError }
        } = response;
        const res = authCode!.find(({ code }) => code === status || code === data?.code);
        if (res) {
            onLogout!(response);
            onError!({ ...response, ...res });
        } else {
            toast && onError!(response);
        }
        log('Fail', response);
    }
}
