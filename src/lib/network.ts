// 这是一个网络库，提供对http网络请求的支持和处理
// new Http({defaultConfig}).get(path, params).then().catch();
// 1. 全局配置为实例化的都是确定下来的，不允许修改；如果想要修改配置，需要重新实例化一个新的对象
// 2. 每次请求都可以传入一个配置，覆盖全局配置

type Headers = Record<string, unknown>;

export interface HttpResponse {
    data: unknown;
    status: number;
    statusText: string;
    headers: Headers;
    config: Config;
}

interface Config {
    timeout?: number; // 超时毫秒值
    baseURL?: string; // 请求地址前缀
    headers?: Headers; // 请求头
    method?: string; // 请求方法
    url?: string; // 请求地址
    params?: Record<string, unknown> | string | null; // 请求参数
    data?: Record<string, unknown> | string | null | FormData; // 请求体
    responseType?: string; // 响应类型
    requestInterarptor?: (config: Config) => Config; // 请求拦截器
    responseInterarptor?: (response: HttpResponse) => HttpResponse; // 响应拦截器
}

class Http {
    private globalConfig: Config;

    constructor(
        globalConfig: Config = {
            baseURL: document.location.origin,
            timeout: 10 * 1000,
        }
    ) {
        this.globalConfig = globalConfig;
    }

    get(url: string, params: Headers = {}, config: Config = {}) {
        return this.start({
            ...this.globalConfig,
            ...config,
            method: 'GET',
            url: url,
            params: params,
            data: null,
        });
    }

    post(url: string, data: Headers | FormData = {}, config: Config = {}) {
        return this.start({
            ...this.globalConfig,
            ...config,
            method: 'POST',
            url,
            params: null,
            data,
        });
    }

    put(url: string, data: Headers = {}, config: Config = {}) {
        return this.start({
            ...this.globalConfig,
            ...config,
            method: 'PUT',
            url: url,
            params: null,
            data: data,
        });
    }

    delete(url: string, params: Headers = {}, config: Config = {}) {
        return this.start({
            ...this.globalConfig,
            ...config,
            method: 'DELETE',
            url: url,
            params: params,
            data: null,
        });
    }

    start(config: Config = {}) {
        const finallyConfig = { ...this.globalConfig, ...config };
        const { method, url, params, data } = finallyConfig;

        // 处理请求拦截器
        if (finallyConfig.requestInterarptor) {
            const newConfig = finallyConfig.requestInterarptor(finallyConfig);
            if (newConfig) {
                Object.assign(finallyConfig, newConfig);
            }
        }
        if (!method || !url) {
            return Promise.reject(new Error('Method and URL are required'));
        }
        let fullUrl = finallyConfig.baseURL + url;

        if (params) {
            if (typeof params === 'object') {
                const newParams = Object.entries(params).reduce((acc, [key, value]) => {
                    if (['string', 'number', 'boolean'].includes(typeof value)) {
                        acc += '&' + key + '=' + String(value);
                    }
                    return acc;
                }, '');
                fullUrl += '?' + newParams;
            } else if (typeof params === 'string') {
                fullUrl += '?' + params;
            }
        }

        // 如果是json格式的请求体，直接将对象转为json字符串
        const contentType = finallyConfig.headers?.['Content-Type'] as string | undefined;
        if (contentType?.includes('/json')) {
            if (data && typeof data === 'object') {
                finallyConfig.data = JSON.stringify(data);
            }
        }

        // 如果是formData格式，删除headers中的Content-Type
        if (data instanceof FormData) {
            delete finallyConfig.headers?.['Content-Type'];
        }

        const options: RequestInit = {
            method,
            headers: {
                ...finallyConfig.headers,
            } as HeadersInit,
            body: data as BodyInit | null,
        };

        return fetch(fullUrl, options).then(async fetchResponse => {
            const contentType = fetchResponse.headers.get('Content-Type');
            let responseData: unknown = null;
            if (contentType?.includes('application/json')) {
                responseData = await fetchResponse.json();
            }

            const response: HttpResponse = {
                data: responseData || fetchResponse.text(),
                status: fetchResponse.status,
                statusText: fetchResponse.statusText,
                headers: Object.fromEntries(fetchResponse.headers.entries()),
                config: finallyConfig,
            };

            // 处理拦截器
            if (finallyConfig.responseInterarptor) {
                const newResponse = finallyConfig.responseInterarptor(response);
                if (newResponse) {
                    Object.assign(response, newResponse);
                }
            }

            return response;
        });
    }
}

export default Http;
