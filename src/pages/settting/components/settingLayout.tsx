import { WSelect } from "@/components";
import { useState } from "react";

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
    const [position, setPosition] = useState("left");
    const [state, setState] = useState("auto");

    const handlePositionChange = (position: string) => {
        setPosition(position);
        // 将设置保存到localStorage
        localStorage.setItem('navbarPosition', position);
    }

    const handleStateChange = (state: string) => {
        setState(state);
        // 将设置保存到localStorage
        localStorage.setItem('navbarState', state);
    }

    return <div className="flex flex-col w-full gap-2">
            <div className="flex items-center mb-2 text-sm">
                <div className="flex justify-center items-center mr-2">导航栏位置</div>
                <div className="flex flex-col">
                    <WSelect 
                        options={navbarPositionOption} 
                        selectedIds={[position]} 
                        size="sm"
                        onChange={(ids) => handlePositionChange(ids[0])}
                    />
                </div>
            </div>
            <div className="flex items-center mb-2 text-sm">
                <div className="flex justify-center items-center mr-2">导航栏状态</div>
                <div className="flex flex-col">
                    <WSelect 
                        options={navbarStateOptions} 
                        selectedIds={[state]} 
                        size="sm"
                        onChange={(ids) => handleStateChange(ids[0])}
                    />
                </div>
            </div>
    </div>;   
}
