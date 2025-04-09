import { WSelect } from "@/components";

const options = [{
    id: "simple",
    name: "简约",
}, {
    id: "card",
    name: "卡片",
}, {
    id: "list",
    name: "列表",
}];

export default function SettingNote() {
    return <div>
            <div className="flex items-center mb-2 text-sm">
                <div className="flex justify-center items-center mr-2">笔记风格</div>
                <div className="flex flex-col">
                    <WSelect options={options} selectedIds={['simple']} size="sm"/>
                </div>
            </div>
    </div>
}
