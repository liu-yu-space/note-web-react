import { globalMsgManager } from '@/utils';

const LOGIN_ROUTE = '/auth/login'; // 401错误跳转的页面

interface HttpOptions {
    method?: string;
    credentials?: RequestCredentials;
    headers?: {
        'Content-Type'?: string;
    };
    body?: BodyInit;
}

const http = <T>(url: string, options: HttpOptions = {}): Promise<T> => {
    const defaultOptions = {
        method: 'GET', // 请求方法
        credentials: 'same-origin' as RequestCredentials, // 跨域请求携带cookie
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'), // 这里可以添加token
        },
    };
    const newOptions = { ...defaultOptions, ...options };
    return fetch(url, newOptions)
        .then(response => {
            switch (response.status) {
                case 200:
                case 201:
                    if (url.includes(LOGIN_ROUTE)) {
                        globalMsgManager.addMsg('登录成功', 'success');
                        return '登录成功';
                    } else {
                        return response.json();
                    }
                case 401:
                    // 401 鉴权失败
                    globalMsgManager.addMsg('鉴权失败，请先登录', 'error');
                    throw new Error('HTTP error! Status: 401 鉴权失败');
                case 403:
                    // 访问权限缺失
                    throw new Error('HTTP error! Status: 403 无访问权限');
                default:
                    throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then((data: T) => {
            return data;
        })
        .catch(error => {
            if (typeof error !== 'string') {
                globalMsgManager.addMsg(navigator.onLine ? '网络错误，请稍后重试' : '网络连接失败，请检查网络设置', 'error');
            }
            return Promise.reject(new Error('Fetch error: ' + error));
        });
};

export default http;
