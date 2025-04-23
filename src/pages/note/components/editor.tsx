import { ChangeEvent, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { ImagePlus, Link } from 'lucide-react';
import { useUpload } from '@/hooks/useUpload';

export default function CreateNotePage({
    onTextUpdate,
    text,
}: {
    onTextUpdate: (text: string) => void;
    text: string;
}) {
    const editorRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (editorRef.current && editorRef.current.value !== text) {
            editorRef.current.value = text;
            onTextUpdate(text);
        }
    }, [text, onTextUpdate]);

    const debouncedOnChange = debounce((e: ChangeEvent<HTMLTextAreaElement>) => {
        onTextUpdate(e.target.value);
    }, 250);

    const liClass =
        'hover:cursor-pointer hover:bg-primary-shadow rounded-sm p-1 transition-all duration-300 hover:text-primary';

    // 处理图片上传
    const uploadRef = useRef<HTMLInputElement>(null);
    const { upload } = useUpload();

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageData = await upload(file);
            const data = imageData?.data as { id: string };
            if (data?.id) {
                const imageUrl = location.origin + '/api/files/' + data.id;
                // 获取当前光标位置
                const cursorPos = editorRef.current?.selectionStart ?? 0;
                const textBefore = text.substring(0, cursorPos);
                const textAfter = text.substring(cursorPos);
                // 在光标位置插入Markdown图片语法
                const newText = `${textBefore}![图片](${imageUrl})${textAfter}`;
                // 更新文本内容
                onTextUpdate(newText);
                // 设置光标位置到图片语法后面
                setTimeout(() => {
                    if (editorRef.current) {
                        const newCursorPos = cursorPos + `![图片](${imageUrl})`.length;
                        editorRef.current.focus();
                        editorRef.current.setSelectionRange(newCursorPos, newCursorPos);
                    }
                }, 0);
            }
        }
    };

    return (
        <div className="w-full h-full relative">
            <div className="absolute top-1 left-0 w-full h-10 flex items-center justify-between text-sm text-gray-300 box-border px-4">
                <ul className="flex items-center gap-2">
                    <li
                        className={liClass}
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
                    </li>
                    <li className={liClass} title="插入链接">
                        <Link size={18} />
                    </li>
                </ul>
                <div className="select-none">{`${text.length}/10000`}</div>
            </div>
            <textarea
                ref={editorRef}
                placeholder="正文内容"
                className="p-4 w-full h-full outline-none resize-none overflow-auto bg-gray-50 border-gray-50 focus:border-primary border transition-all duration-300 pt-10"
                onChange={debouncedOnChange}
            />
        </div>
    );
}
