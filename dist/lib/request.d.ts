import { Config, RequestInterceptor, ResponseInterceptor, RequestMethod } from '../types';
import { Interceptor } from './interceptors';
export declare class Request {
    private config;
    interceptors: {
        request: Interceptor<RequestInterceptor>;
        response: Interceptor<ResponseInterceptor>;
    };
    get: RequestMethod;
    post: RequestMethod;
    put: RequestMethod;
    del: RequestMethod;
    constructor(config?: Config);
    private onRequest;
    private replaceUrlParams;
    private mergeParams;
    private errorHandler;
}
