import { useState } from "react";
import showdown from "showdown";
import Editor from "./components/editor_";
import Note from "./components/note";
import { Save } from "lucide-react";
import { WButton, WSwitch } from "@/components";
import { useNavigate } from 'react-router-dom';

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
    
    const [checked, setChecked] = useState(false);
    function handleClick(val: boolean) {
        console.log(val);
        setChecked(!checked);
    }

    const navigate = useNavigate();
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
                <p className="flex items-center gap-4 justify-between pb-2">
                    <div className="flex items-center gap-2">
                        <WSwitch checked={checked} onText="公开" offText="草稿" onChange={handleClick}/>
                        <WButton type="text"><Save size={22} strokeWidth={1.25} /></WButton>
                    </div>
                    <WButton handleClick={() => void navigate("/note")}>返回列表</WButton>
                </p>
                <Note html={html} />
            </div>
        </div>
    );
}
