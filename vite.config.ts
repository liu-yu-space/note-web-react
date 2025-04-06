import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        proxy: {
            // 代理跨域请求
            '/auth': {
                target: 'http://localhost:3000', // 目标服务器
                changeOrigin: true, // 是否更改请求源
            },
            '/api/note': {
                target: 'http://localhost:3000', // 目标服务器
                changeOrigin: true, // 是否更改请求源
                rewrite: path => path.replace(/^\/api\/note/, '/note'), // 正确的函数格式
            },
        },
    },
});
