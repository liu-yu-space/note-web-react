import { WButton, WInput, WSwitch } from "@/components";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Experiment() {

    const [checked, setChecked] = useState(false);

    function handleClick(val: boolean) {
        console.log(val);
        setChecked(!checked);
    }

    return <div className="p-10 ">
        <WButton><Plus size="16"/> Hello World</WButton><br/>
        <WButton size="small"><Plus size="16"/> Hello World</WButton><br/>
        <WButton size="large"><Plus size="16"/> Hello World</WButton>
        <WButton type="text"><Plus size="16"/>Hello World</WButton>
        <WInput placeholder="搜索" /> 
        <WSwitch checked={checked} onText="公开" offText="草稿" onChange={handleClick}/>
        <div className="group bg-gray-300 p-4">
            <div className="group bg-blue-200 p-4">
                <div className="group bg-yellow-200 p-4">
                <button className="group-hover:bg-blue-500 group-focus:bg-red-500 px-4 py-2 text-white">
                    Hover or Focus me!
                </button>
                </div>
            </div>
        </div>
        <div className="group bg-gray-300 p-4">
            <div className="group bg-blue-200 p-4">
                <button className="group-hover:bg-blue-500 px-4 py-2 text-white">Hover me!</button>
            </div>
        </div>

    </div>;
}
