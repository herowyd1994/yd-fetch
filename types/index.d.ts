import { Config, Fetch, MethodFn } from './types';
import { Request } from './lib/request';
export declare const createFetch: (config: Config) => (({ method, url, ...opts }: {
    [x: string]: any;
    method: any;
    url: any;
}) => any) & Request;
export declare const useFetch: () => {
    fetch: Fetch & Request;
    defaultConfig: Config;
    del: MethodFn;
    get: MethodFn;
    post: MethodFn;
    put: MethodFn;
};
