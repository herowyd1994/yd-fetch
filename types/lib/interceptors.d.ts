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
    adapter?<D>(config: RequestConfig): Promise<Response<D>>;
    onLogout?(response: Response): void;
    onError?(response: Response): void;
    transformRequestUrl?(response: RequestConfig): string;
    transformRequestBody?(response: RequestConfig): any;
}>;
export declare const responseInterceptor: (response: Response) => Promise<Response<any>>;
