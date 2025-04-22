// 这是一个网络库，提供对http网络请求的支持和处理
// new Http({defaultConfig}).get(path, params).then().catch();
// 1. 全局配置为实例化的都是确定下来的，不允许修改；如果想要修改配置，需要重新实例化一个新的对象
// 2. 每次请求都可以传入一个配置，覆盖全局配置
// 3.

type Headers = Record<string, string>;

interface Response {
    data: unknown;
    status: number;
    statusText: string;
    headers: Headers;
    config: Config;
}

interface Config {
    timeout?: number; // 毫秒值
    baseURL?: string; // 请求地址前缀
    headers?: Headers; // 请求头
    method?: string; // 请求方法
    url?: string; // 请求地址
    params?: Record<string, unknown> | string | null; // 请求参数
    data?: Record<string, unknown> | string | null; // 请求体
    responseType?: string; // 响应类型
    requestInterarptor?: (config: Config) => Config; // 请求拦截器
    responseInterraptor?: (response: Response) => Response; // 响应拦截器
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

    post(url: string, data: Headers = {}, config: Config = {}) {
        return this.start({
            ...this.globalConfig,
            ...config,
            method: 'POST',
            url: url,
            params: null,
            data: data,
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
        if (!method || !url) {
            return Promise.reject(new Error('Method and URL are required'));
        }
        let fullUrl = finallyConfig.baseURL + url;

        if (params) {
            // 如果params是对象，转换为查询字符串
            // 如果params是字符串，直接拼接到url后面
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

        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...finallyConfig.headers,
            },
            body: data ? JSON.stringify(data) : null,
        };

        return fetch(fullUrl, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
}

export default Http;
