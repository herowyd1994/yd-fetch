import { RequestConfig, Response } from '../types';
export declare class Interceptor<I extends Function> {
    private interceptors;
    use(interceptor: I): this;
    notify<P>(params: P): Promise<P>;
}
export declare const requestInterceptor: ({ query, headers, onHeader, baseURL, url, ...config }: RequestConfig) => Promise<{
    onHeader: (headers: Record<string, any>) => Promise<Record<string, any>> | Record<string, any>;
    baseURL: string;
    url: string;
    headers: any;
    query: any;
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, any>;
    authCode?: {
        code: number;
        errMsg?: string;
    }[];
    toast?: boolean;
    logProps?: Partial<{
        color: string;
        disable: boolean;
        handler: (response: Response) => void;
    }>;
    adapter?(config: RequestConfig<any>): Promise<Response<any>>;
    onLogout?(response: Response): void;
    onError?(response: Response): void;
    transformRequestUrl?(response: RequestConfig<any>): string;
    transformRequestBody?(response: RequestConfig<any>): any;
    formatParams?(params: Record<string, any>): Promise<Record<string, any>> | Record<string, any>;
    formatData?(data: any): any;
}>;
export declare const responseInterceptor: (response: Response) => Promise<Response<any>>;
