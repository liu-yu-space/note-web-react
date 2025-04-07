export default function CreateNotePage({
    onTextUpdate,
    text,
}: {
    onTextUpdate: (text: string) => void;
    text: string;
}) {
    onTextUpdate(text);

    return (
        <textarea
            placeholder="正文内容"
            value={text}
            className="p-4 w-full h-full outline-none resize-none overflow-auto bg-gray-50 focus:bg-gray-100 transition-all duration-300"
            onChange={e => {
                onTextUpdate(e.target.value);
            }}
        />
    );
}
