import { useState } from "react";
import showdown from "showdown";
import Editor from "./components/editor_";
import Note from "./components/note";
import { Save } from "lucide-react";
import { WButton } from "@/components";

export default function CreateNotePage() {
    let inputText = "";
    const [html, setHtml] = useState("");
    const converter = new showdown.Converter({
        emoji: true,
        tasklists: true,
        simpleLineBreaks: true,
    });
    const updateText = function (text: string) {
        inputText = text.trim();
        console.log(inputText);
        setHtml(converter.makeHtml(text));
    };

    return (
        <div className="flex h-full relative">
            <div className="w-1/2 h-full p-4 flex flex-col">
                <input 
                    type="text" 
                    placeholder="标题内容" 
                    className="w-full mb-4 p-4 border-gray-300 outline-none bg-gray-50 focus:bg-gray-100 transition-all duration-300"
                />
                <Editor onTextUpdate={updateText} />
            </div>
            <hr className="origin-top-left rotate-90 absolute w-[calc(100vh-2rem)] left-[50%] text-gray-300 top-4" />
            <div className="w-1/2 h-full p-4 flex flex-col">
                <p className="flex items-center gap-4 justify-end pb-2">
                    <Save size={18} strokeWidth={1.25} />
                    <WButton>返回列表</WButton>
                </p>
                <Note html={html} />
            </div>
        </div>
    );
}
