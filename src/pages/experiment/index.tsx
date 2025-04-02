import { WButton, WInput, WSwitch, WTag, WSelect } from '@/components';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useMsgContext } from '@/components/wmsg/createContext';

let count = 0;
export default function Experiment() {
    const [checked, setChecked] = useState(false);

    function handleClick(val: boolean) {
        console.log(val);
        setChecked(!checked);
    }

    const { addMsg } = useMsgContext();
    function handleClick2() {
        addMsg('Hello World' + ++count, 'info', 3000);
    }
    return (
        <div className="p-10">
            <WButton>
                <Plus size="16" /> Hello World
            </WButton>
            <br />
            <WButton size="small">
                <Plus size="16" /> Hello World
            </WButton>
            <br />
            <WButton size="large">
                <Plus size="16" /> Hello World
            </WButton>
            <WButton type="text">
                <Plus size="16" />
                Hello World
            </WButton>
            <WInput placeholder="搜索" />
            <WSwitch checked={checked} onText="公开" offText="草稿" onChange={handleClick} />
            <div className="flex p-4">
                {new Array(10).fill(0).map((_, i) => (
                    <WTag key={i} hDegree={36 * i} text={`标签${i + 1}`} />
                ))}
            </div>
            <div className="p-4 w-36">
                <WSelect
                    options={[
                        { id: '1', text: '选项1' },
                        { id: '2', text: '选项2' },
                        { id: '3', text: '选项3' },
                        { id: '4', text: '选项4' },
                        { id: '5', text: '选项5' },
                        { id: '6', text: '选项6' },
                        { id: '7', text: '选项7' },
                        { id: '8', text: '选项8' },
                        { id: '9', text: '选项9' },
                        { id: '10', text: '选项10' },
                        { id: '11', text: '选项11' },
                        { id: '12', text: '选项12' },
                        { id: '13', text: '选项13' },
                    ]}
                    selectedIds={['1']}
                    multi={true}
                />
            </div>
            <div className="p-4">
                <WButton handleClick={handleClick2}>测试msg</WButton>
            </div>
        </div>
    );
}
