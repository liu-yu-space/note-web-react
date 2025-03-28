import { WButton, WInput, WSwitch, WTag } from "@/components";
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
        <div className="flex p-4">
            {new Array(10).fill(0).map((_, i) => <WTag key={i} hDegree={36*i} text={`标签${i+1}`} />)}
        </div>
    </div>;
}
