import { RequestConfig } from '../types';
declare const _default: (config: RequestConfig) => Promise<{
    status: number;
    data: any;
    errMsg: any;
    config: RequestConfig;
    headers: Headers;
    ok: boolean;
    redirected: boolean;
    statusText: string;
    type: ResponseType;
    url: string;
    clone(): Response;
    body: ReadableStream<Uint8Array> | null;
    bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}>;
export default _default;