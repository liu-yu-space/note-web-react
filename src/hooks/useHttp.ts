import { useCallback } from 'react';
import { request } from '@liu-yu/rum';
import { messageManager } from '@/store';

// 兼容性处理：本地声明类型
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export interface RequestConfig {
    url: string;
    method?: Method;
    headers?: Record<string, string>;
    body?: BodyInit;
    timeout?: number;
    credentials?: RequestCredentials; // 补充 credentials 字段
    onProgress?: (percent: number, loaded: number, total: number) => void;
}

// 全局请求拦截器
const requestInterceptor = (config: RequestConfig): RequestConfig => {
    // 可在此添加token等逻辑
    // config.headers = { ...config.headers, Authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
};

// 全局响应拦截器
const responseInterceptor = (response: Response): Response => {
    if (response.status === 401) {
        messageManager.addMsg('登录已过期，请重新登录', 'error', 3000);
        localStorage.removeItem('app_is_logged_in');
        localStorage.removeItem('app_user_info');
        window.dispatchEvent(new Event('auth-logout'));
    }
    return response;
};

export interface HttpOptions
    extends Omit<RequestConfig, 'url' | 'method' | 'timeout' | 'credentials'> {
    url: string;
    method?: Method;
    timeout?: number;
    credentials?: RequestCredentials;
}

export function useHttp() {
    // 返回一个通用的 http 方法
    return useCallback(
        async ({
            url,
            method = 'GET',
            headers = { 'Content-Type': 'application/json' },
            body,
            timeout = 60000,
            credentials = 'same-origin',
        }: HttpOptions) => {
            return request(
                { url, method, headers, body, timeout, credentials } as RequestConfig,
                [requestInterceptor],
                [responseInterceptor]
            );
        },
        []
    );
}
