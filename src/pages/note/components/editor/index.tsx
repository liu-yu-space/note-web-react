import { ChangeEvent, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import InsertImg from './insertImg';
import InsertLink from './insertLink';

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

    // 执行插入操作
    const insertText = (text: string) => {
        if (editorRef.current) {
            const cursorPos = editorRef.current.selectionStart;
            const textBefore = editorRef.current.value.substring(0, cursorPos);
            const textAfter = editorRef.current.value.substring(cursorPos);
            const newText = `${textBefore}${text}${textAfter}`;
            editorRef.current.value = newText;
            onTextUpdate(newText);
            setTimeout(() => {
                const newCursorPos = cursorPos + text.length;
                editorRef.current?.focus();
                editorRef.current?.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        }
    };

    return (
        <div className="w-full h-full relative">
            <div className="absolute top-1 left-0 w-full h-10 flex items-center justify-between text-sm text-gray-300 box-border px-4">
                <div className="flex items-center gap-2">
                    <InsertImg insertText={insertText} />
                    <InsertLink insertText={insertText} />
                </div>
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
