// useUpload.ts
import { useState } from 'react';
import { request } from '@liu-yu/rum';

export interface UploadResult {
    filename: string;
    id: string;
    mimetype: string;
    originalName: string;
    size: number;
}

export function useUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const upload = async (file: File): Promise<UploadResult | null> => {
        if (!file) return null;

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // 使用@liu-yu/rum的request方法
            const res = await request({
                url: '/api/files/upload',
                method: 'POST',
                body: formData,
            });

            // 这里假设res.data为上传结果
            if (res) {
                setIsUploading(false);
                return res as UploadResult;
            } else {
                throw new Error('无效的响应');
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
