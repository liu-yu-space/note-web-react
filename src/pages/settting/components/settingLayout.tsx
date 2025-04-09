import { WSelect } from "@/components";
import { useState } from "react";
import { useLayout } from "@/store";

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

interface Layout {
    position: "left" | "top";
    state: "always" | "auto";
}

export default function SettingLayout() {
    const cachedLayout = localStorage.getItem('layout');
    const parsedLayout: Layout | null = cachedLayout ? JSON.parse(cachedLayout) as Layout : null;
    const [position, setPosition] = useState<"left" | "top">(parsedLayout ? parsedLayout.position : "left");
    const [state, setState] = useState<"always" | "auto">(parsedLayout ? parsedLayout.state : "auto");
    const { toggleLayout } = useLayout();
    
    const handlePositionChange = (position: Layout["position"]) => {
        setPosition(position);
        toggleLayout("position", position);
    }

    const handleStateChange = (state: Layout["state"]) => {
        setState(state);
        toggleLayout("state", state);
    }

    return <div className="flex flex-col w-full gap-2">
            <div className="flex items-center mb-2 text-sm">
                <div className="flex justify-center items-center mr-2">导航栏位置</div>
                <div className="flex flex-col">
                    <WSelect 
                        options={navbarPositionOption} 
                        selectedIds={[position]} 
                        size="sm"
                        onChange={(ids) => handlePositionChange(ids[0] as Layout["position"])}
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
                        onChange={(ids) => handleStateChange(ids[0] as Layout["state"])}
                    />
                </div>
            </div>
    </div>;   
}
