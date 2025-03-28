import { useState } from "react";
import { NotebookText, Pencil } from "lucide-react";
import { idCreator } from "@/lib/tools";
import { WButton, WTag } from "@/components";

export default function Timeline() {
    interface Item {
        title: string;
        labels: string[];
        abstract: string;
        time: string;
    }

    const [data] = useState<Item[]>([
        {
            title: "标题一",
            labels: ["标签一", "标签二", "标签二", "标签二", "标签二", "标签二", "标签二", "标签二"],
            abstract: "2021年，是我生命中的重要一年。",
            time: "2021-01-01",
        },
        {
            title: "标题二",
            labels: [],
            abstract: "2021年，是我生命中的重要一年。",
            time: "2021-01-01",
        },
        {
            title: "标题三",
            labels: [],
            abstract: "2021年，是我生命中的重要一年。",
            time: "2021-01-01",
        },
        {
            title: "标题三标题三标题三标题三标题三标题三标题三标题三标题三标题三标题三",
            labels: [],
            abstract: "2021年，是我生命中的重要一年。",
            time: "2021-01-01",
        },
        {
            title: "标题三",
            labels: [],
            abstract: "2021年，是我生命中的重要一年。",
            time: "2021-01-01",
        },
        {
            title: "标题三",
            labels: [],
            abstract: "2021年，是我生命中的重要一年。",
            time: "2021-01-01",
        },
        {
            title: "标题三",
            labels: [],
            abstract: "2021年，是我生命中的重要一年。",
            time: "2021-01-01",
        },
        {
            title: "标题三",
            labels: [],
            abstract: "2021年，是我生命中的重要一年。",
            time: "2021-01-01",
        },
        {
            title: "标题三",
            labels: [],
            abstract: "2021年，是我生命中的重要一年。",
            time: "2021-01-01",
        },
        {
            title: "标题三",
            labels: [],
            abstract: "2021年，是我生命中的重要一年。",
            time: "2021-01-01",
        },
    ]);

    return (
        <ul className="p-4 text-sm text-gray-500 h-full overflow-auto">
            {data.map((item) => (
                <li
                    key={idCreator()}
                    className="py-8 relative before:content-[''] before:block before:absolute 
                        before:left-4 before:h-full before:w-0.5 before:bg-gray-200 
                        first:before:top-[calc(50%)] last:before:-top-[calc(50%)]"
                >
                    <div className="group timeline-item hover:cursor-pointer hover:bg-primary-shadow pr-6 py-2 pl-8 rounded-sm">
                        <div className="flex items-center gap-1">
                            <NotebookText size={18} strokeWidth={1.25} className="shrink-0"/>
                            <h2 className="title">{item.title}</h2>
                            <span className="bg-gray-400 absolute top-[calc(50%-7px)] left-[13px] w-2 h-2 rounded"></span>
                        </div>
                        <div>
                            <div className="my-2">
                                {item.labels.map((label, i) => (
                                    <WTag key={idCreator()} text={label + i} hDegree={i * 45}></WTag>
                                ))}
                            </div>
                            <p className="text-gray-400 text-xs">{item.time}</p>
                        </div>
                        <div className="absolute right-2 top-[calc(50%-10px)] opacity-0 group-hover:opacity-100">
                            <WButton type="text"><Pencil size={16} strokeWidth={1.25} /></WButton>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
