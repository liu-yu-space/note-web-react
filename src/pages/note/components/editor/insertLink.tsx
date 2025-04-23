import { Link } from 'lucide-react';

export default function InsertLink({ insertText }: { insertText: (text: string) => void }) {
    return (
        <div
            className="hover:cursor-pointer hover:bg-primary-shadow rounded-sm p-1 transition-all duration-300 hover:text-primary"
            title="插入链接"
            onClick={() => insertText('[链接](https://example.com)')}
        >
            <Link size={18} />
        </div>
    );
}
