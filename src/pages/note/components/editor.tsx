import markdownit from "markdown-it";
import { FormEvent, useState } from "react";
import { WButton } from "@/components";

export default function Note() {
    const md = markdownit();
    const [mdText, setMdText] = useState("");

    function handleInput(event: FormEvent<HTMLDivElement>) {
        const input = event.target as HTMLInputElement;
        console.log(input.innerHTML);
        if (input?.innerHTML) {
            const output = md.render(input.innerHTML);
            console.log(output);
            setMdText(output);
        }
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex w-full h-12 border-r border-gray-200 py-3 px-10">
                <input
                    className="w-full text-base outline-none"
                    type="text"
                    placeholder="请输入标题"
                />
                <div className="flex w-20 direction-row justify-end items-center">
                    <WButton type="text">保存</WButton>
                </div>
            </div>
            <div className="flex gap-2 w-full h-full pb-4">
                <div
                    contentEditable={"plaintext-only"}
                    className="w-full h-full border border-gray-200 outline-none p-4"
                    onInput={handleInput}
                ></div>
                <div
                    className="w-full h-[100%] border font-lxgw md-container border-gray-200 outline-none p-4"
                    dangerouslySetInnerHTML={{ __html: mdText }}
                ></div>
            </div>
        </div>
    );
}
