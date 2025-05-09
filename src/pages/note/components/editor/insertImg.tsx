import { ImagePlus } from 'lucide-react';
import { useRef, ChangeEvent } from 'react';
import { useUpload } from '@/hooks/useUpload';

export default function InsertImg({ insertText }: { insertText: (text: string) => void }) {
    // 处理图片上传
    const uploadRef = useRef<HTMLInputElement>(null);
    const { upload } = useUpload();

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageData = await upload(file);
            const data = imageData;
            if (data?.id) {
                const imageUrl = location.origin + '/api/files/' + data.id;
                const newText = `![${data.filename}](${imageUrl})`;
                insertText(newText);
            }
        }
        e.target.value = '';
    };

    return (
        <div
            className="hover:cursor-pointer hover:bg-primary-shadow rounded-sm p-1 transition-all duration-300 hover:text-primary"
            title="插入图片"
            onClick={() => uploadRef.current?.click()}
        >
            <input
                ref={uploadRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => void handleUpload(e)}
            />
            <ImagePlus size={18} />
        </div>
    );
}
