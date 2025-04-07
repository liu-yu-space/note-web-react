import { Palette, NotebookText, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { WSelect } from "@/components";

const Settings = [
    {
        title: "主题",
        icon: <Palette size={16} />,
        list: [{
            text: "主题模式",
            type: "select",
            options: [{
                id: "light",
                name: "浅色",
            }, {
                id: "dark",
                name: "深色",
            }, {
                id: "system",
                name: "跟随系统",
            }],
            default: "system",
        }],
    },
    {
        title: "布局",
        icon: <LayoutDashboard size={16} />,
        list: [{
            text: "导航栏位置",
            type: "select",
            options: [{
                id: "left",
                name: "左侧",
            }, {
                id: "top",
                name: "顶部",
            }],
            default: "left",
        }, {
            text: "导航栏状态",
            type: "select",
            options: [{
                id: "always",
                name: "始终显示",
            }, {
                id: "auto",
                name: "自动隐藏",
            }],
            default: "auto",
        }],
    },
    {
        title: "笔记",
        icon: <NotebookText size={16} />,
        list: [{
            text: "笔记风格",
            type: "select",
            options: [{
                id: "simple",
                name: "简约",
            }, {
                id: "card",
                name: "卡片",
            }, {
                id: "list",
                name: "列表",
            }],
            default: "simple",
        }],
    },
];

export default function SettingsPage() {

    const [activeSetting, setActiveSetting] = useState(Settings[0]);
    let activeSettingList = activeSetting.list;

    return (
        <main className="w-full h-full p-4 flex">
            <div className="flex flex-col items-center">
                {Settings.map((setting, index) => (
                    <div key={index} className={`flex justify-center items-center my-2 text-sm w-30 rounded-bl-sm rounded-tl-sm hover:bg-gray-100 p-2 
                        cursor-pointer before:content-[''] before:border-l-3 before:h-4 before:mr-2 relative before:absolute before:top-2.5 before:left-4 ${
                            activeSetting === setting ? "before:border-primary bg-gray-100" : "before:border-transparent"
                        }`}
                        onClick={() => {
                            setActiveSetting(setting);
                            activeSettingList = activeSetting.list;
                            console.log(activeSetting === setting);
                        }}
                    >
                        <div className="flex justify-center items-center mr-2">{setting.icon}</div>
                        <div className="flex flex-col">{setting.title}</div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-gray-100 rounded-md w-full">
                {activeSettingList.map((item) => (
                    <div key={item.text} className="flex items-center mb-2 text-sm">
                        <div className="flex justify-center items-center mr-2">{item.text}</div>
                        <div className="flex flex-col">
                            {item.type === "select" && (
                                <WSelect options={item.options} selectedIds={[item.default]} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
