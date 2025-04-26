import { useEffect, useRef } from 'react';

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

    return (
        <textarea
            ref={editorRef}
            placeholder="正文内容"
            className="p-4 w-full h-full outline-none resize-none overflow-auto bg-gray-50 focus:bg-gray-100 transition-all duration-300"
            onChange={e => {
                onTextUpdate(e.target.value);
            }}
        />
    );
}
