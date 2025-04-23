import Http from './network';

export default new Http({
    baseURL: location.origin,
    timeout: 10 * 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    requestInterarptor: config => {
        // console.log('请求拦截器', config);
        return config;
    },
    responseInterarptor: response => {
        // console.log('响应拦截器', response);
        return response;
    },
});
