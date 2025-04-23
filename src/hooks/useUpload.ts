// useUpload.ts
import { useState } from 'react';
import http from '@/lib/request'; // 假设您有网络请求库
import type { HttpResponse } from '@/lib/network'; // 假设您有网络请求库

export function useUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const upload = async (file: File): Promise<HttpResponse | null> => {
        if (!file) return null;

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await http.post('/api/files/upload', formData);

            if (res.status.toString().startsWith('2')) {
                // 假设服务器返回的数据中包含文件URL
                setIsUploading(false);
                return res;
            } else {
                throw new Error('上传失败');
            }
        } catch (err) {
            console.error(err);
            setError('上传失败');
            setIsUploading(false);
            return null;
        }
    };

    return { upload, isUploading, error };
}
