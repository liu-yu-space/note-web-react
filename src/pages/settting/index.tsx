import { Palette, NotebookText, LayoutDashboard } from "lucide-react";
import { useState } from "react";
// import SettingNote from "./components/settingNote";
import SettingLayout from "./components/settingLayout";
import SettingTheme from "./components/settingTheme";

const Settings = [
    {
        id: "theme",
        title: "主题",
        icon: <Palette size={16} />,
    },
    {
        id: "layout",
        title: "布局",
        icon: <LayoutDashboard size={16} />,
    },
    {
        id: "note",
        title: "笔记",
        icon: <NotebookText size={16} />,
    },
];

export default function SettingsPage() {

    const [activeSetting, setActiveSetting] = useState(Settings[0]);

    return (
        <main className="w-full h-full p-4 flex dark:text-white">
            <div className="flex flex-col items-center">
                {Settings.map((setting) => (
                    <div key={setting.title} className={`flex justify-center items-center my-2 text-sm w-30 rounded-bl-sm rounded-tl-sm hover:bg-gray-100 hover:dark:bg-gray-700 p-2 
                        cursor-pointer before:content-[''] before:border-l-3 before:h-4 before:mr-2 relative before:absolute before:top-2.5 before:left-4 ${
                            activeSetting === setting ? "before:border-primary bg-gray-100 dark:bg-gray-700" : "before:border-transparent"
                        }`}
                        onClick={() => {
                            setActiveSetting(setting);
                        }}
                    >
                        <div className="flex justify-center items-center mr-2">{setting.icon}</div>
                        <div className="flex flex-col">{setting.title}</div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md w-full">
                {activeSetting.id === 'layout' && <SettingLayout />}
                {activeSetting.id === 'theme' && <SettingTheme />}
                {/* {activeSetting.id === 'note' && <SettingNote />} */}
            </div>
        </main>
    );
}
