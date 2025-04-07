import { WSelect } from "@/components";

const navbarPositionOption = [{
    id: "left",
    name: "左侧",
}, {
    id: "top",
    name: "顶部",
}];

const navbarStateOptions = [{
    id: "always",
    name: "始终显示",
}, {
    id: "auto",
    name: "自动隐藏",
}];

export default function SettingLayout() {
    return <div>
            <div className="flex items-center mb-2 text-sm">
                <div className="flex justify-center items-center mr-2">导航栏位置</div>
                <div className="flex flex-col">
                    <WSelect options={navbarPositionOption} selectedIds={["left"]} />
                </div>
            </div>
            <div className="flex items-center mb-2 text-sm">
                <div className="flex justify-center items-center mr-2">导航栏状态</div>
                <div className="flex flex-col">
                    <WSelect options={navbarStateOptions} selectedIds={["auto"]} />
                </div>
            </div>
    </div>;   
}
