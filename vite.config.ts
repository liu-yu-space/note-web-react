import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    base: '/note/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // 目标服务器
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '/'), // 正确的函数格式
            },
        },
    },
});
