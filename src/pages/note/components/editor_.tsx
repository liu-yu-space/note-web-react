export default function CreateNotePage({ onTextUpdate }: { onTextUpdate: (text: string) => void }) {
    return (
        <textarea
            className="border-2 border-gray-300 rounded-md p-2 w-full h-full"
            onChange={(e) => {
                onTextUpdate(e.target.value);
            }}
        />
    );
}
