import { useState } from "react";
import { NotebookText } from "lucide-react";

export default function WTimeline() {
    interface Item {
        title: string;
        labels: string[];
        abstract: string;
        time: string;
    }

    const [data] = useState<Item[]>([
        {
            title: "标题一",
            labels: ["标签一", "标签二"],
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
        <ul className="p-4 pl-30 font-lxgw text-sm text-gray-500 h-full overflow-auto">
            {data.map((item, index) => (
                <li
                    key={index}
                    className="py-8 relative before:content-[''] before:block before:absolute 
                        before:-left-4 before:h-full before:w-0.5 before:bg-gray-200 
                        first:before:top-[calc(50%)] last:before:-top-[calc(50%)]"
                >
                    <div className="group timeline-item hover:cursor-pointer hover:text-[var(--color-main)]">
                        <p className="absolute top-[calc(50%-14px)] -left-24">{item.time}</p>
                        <div className="flex items-center gap-1">
                            <NotebookText size={18} strokeWidth={1} absoluteStrokeWidth />
                            <h2 className="title">{item.title}</h2>
                            <span className="bg-gray-400 group-hover:bg-[var(--color-main)] absolute top-[calc(50%-8px)] -left-[19px] w-2 h-2 rounded"></span>
                        </div>
                        <div className="timeline-content">
                            <div className="labels">
                                {item.labels.map((label, index) => (
                                    <span key={index}>{label}</span>
                                ))}
                            </div>
                            <p className="abstract">{item.abstract}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
