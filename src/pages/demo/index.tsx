import { Construction } from "lucide-react";

export default function demo() {
    return (
        <main className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <Construction size={148} strokeWidth={1} className="text-gray-400" />
                <h1 className="text-xl text-gray-400 mt-4">开发中...</h1>
            </div>
        </main>
    );
}
