import { Construction } from "lucide-react";

export default function demo() {
    return (
        <main className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center text-gray-300">
                <Construction size={148} strokeWidth={1} />
                <h1 className="text-xl mt-4">开发中...</h1>
            </div>
        </main>
    );
}
