/** @format */

export interface Config {
    baseURL: string;
    headers?: Record<string, string>;
    authorizationCode?: number[];
    toast?: boolean;
    logProps?: Partial<{
        color: string;
        disable: boolean;
        handler: (response: Response) => void;
    }>;
    adapter?<D>(config: RequestConfig): Promise<Response<D>>;
    onHeader?(headers: Record<string, any>): Promise<Record<string, any>> | Record<string, any>;
    onLogout?(response: Response): void;
    onError?(response: Response): void;
    transformRequestUrl?(response: RequestConfig): string;
    transformRequestBody?(response: RequestConfig): any;
}
export interface Response<D = any> {
    data: {
        code: number;
        data?: D;
        msg: string;
    };
    status: number;
    statusText: string;
    headers: Headers;
    config: RequestConfig;
}
export interface RequestConfig extends Config {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    query?: Record<string, any>;
    body?: Record<string, any>;
}
export type RequestInterceptor = (request: RequestConfig) => Promise<RequestConfig>;
export type ResponseInterceptor = (response: Response) => Promise<Response>;
export type RequestMethod = <D = any>(
    url: string,
    params?: Record<string, any>,
    config?: Partial<RequestConfig>
) => Promise<D>;
export type Fetch = <D = any>(fetchConfig: FetchConfig) => Promise<D>;
interface FetchConfig extends Omit<RequestConfig, 'baseURL' | 'method'> {
    baseURL?: string;
    method: 'get' | 'post' | 'put' | 'delete';
}
export type MethodKeys = 'get' | 'post' | 'put' | 'del';
export type MethodFn = <D = any>(
    url: string,
    params?: Record<string, any>,
    config?: Partial<RequestConfig> & { defaultValue?: D }
) => Promise<D>;
