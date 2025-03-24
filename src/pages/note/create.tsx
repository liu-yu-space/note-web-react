import { useState } from "react";
import showdown from "showdown";
import Editor from "./components/editor_";
import Note from "./components/note";

export default function CreateNotePage() {
    let inputText = "";
    const [html, setHtml] = useState("");
    const converter = new showdown.Converter({
        emoji: true,
        tasklists: true,
    });
    const updateText = function (text: string) {
        inputText = text.trim();
        console.log(inputText);
        setHtml(converter.makeHtml(text));
    };

    return (
        <div className="flex h-full">
            <div className="w-1/2 h-full p-4">
                <Editor onTextUpdate={updateText} />
            </div>
            <hr />
            <div className="w-1/2 h-full p-4">
                <Note html={html} />
            </div>
        </div>
    );
}
