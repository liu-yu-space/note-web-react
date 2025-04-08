import { WSelect } from "@/components";
import { useState } from "react";
import { toggleMode } from "@/utils";

const options = [{
    id: "light",
    name: "浅色",
}, {
    id: "dark",
    name: "深色",
}, {
    id: "system",
    name: "跟随系统",
}];

export default function SettingTheme() {
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") ?? "system");

    const handleThemeChange = (theme: string) => {
        setTheme(theme);
        toggleMode(theme as 'light' | 'dark' | 'system');
    }

    return <div>
        <div className="flex items-center mb-2 text-sm">
            <div className="flex justify-center items-center mr-2">主题</div>
            <div className="flex flex-col">
                <WSelect options={options} selectedIds={[theme]} size="sm" onChange={(ids) => handleThemeChange(ids[0])}/>
            </div>
        </div>
    </div>
} 
