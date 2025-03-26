import { WButton, WInput } from "@/components";
import { Plus } from "lucide-react";

export default function Experiment() {
    return <div className="p-10 ">
        <WButton><Plus size="16"/> Hello World</WButton><br/>
        <WButton size="small"><Plus size="16"/> Hello World</WButton><br/>
        <WButton size="large"><Plus size="16"/> Hello World</WButton>
        <WButton type="text"><Plus size="16"/>Hello World</WButton>
        <WInput placeholder="搜索" /> 
    </div>;
}
