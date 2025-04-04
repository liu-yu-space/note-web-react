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
    return (
        <div className="p-10">
            <ul>
                <li>
                    <h3 className='text-xl text-gray-500 my-2'>按钮</h3>
                    <h4 className='text-lg text-gray-500 my-2'>size（small、default、large）</h4>
                    <div className='flex items-center space-x-2 my-4'>
                        <WButton size="small">
                            <Plus size="16" /> Hello World
                        </WButton>
                        <WButton>
                            <Plus size="16" /> Hello World
                        </WButton>
                        <WButton size="large">
                            <Plus size="16" /> Hello World
                        </WButton>
                    </div>
                    <h4 className='text-lg text-gray-500 my-2'>type（default、text）</h4>
                    <div className='flex items-center space-x-2 my-4'>
                        <WButton type="default">
                            <Plus size="16" />
                            Hello World
                        </WButton>
                        <WButton type="text">
                            <Plus size="16" />
                            Hello World
                        </WButton>
                    </div>
                </li>
                <li>
                    <h3 className='text-xl text-gray-500 my-1'>输入框</h3>
                    <div className='w-64 flex items-center space-x-2 my-4'>
                        <WInput placeholder="搜索" />
                    </div>
                </li>
                <li>
                    <h3 className='text-xl text-gray-500 my-1'>开关</h3>
                    <div className='flex items-center space-x-2 my-4'>
                        <WSwitch checked={checked} onText="打开" offText="关闭" onChange={handleClick} />
                    </div>
                </li>
                <li>
                    <h3 className='text-xl text-gray-500 my-1'>标签</h3>
                    <div className='flex items-center space-x-2 my-4'>
                        <WTag hDegree={360} text="标签1" />
                        <WTag hDegree={180} text="标签2" />
                        <WTag hDegree={90} text="标签3" />
                    </div>
                </li>
                <li>
                    <h3 className='text-xl text-gray-500 my-1'>选择器</h3>
                    <h4 className='text-lg text-gray-500 my-2'>multi（true、false）</h4>

                    <div className='w-64 flex items-center space-x-2 my-4'>
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
                        <WSelect
                            options={[
                                { id: '1', text: '选项1' },
                                { id: '2', text: '选项2' },
                                { id: '3', text: '选项3' },
                                { id: '4', text: '选项4' },
                            ]}
                            selectedIds={['1']}
                            multi={false}
                        />
                    </div>
                </li>
                <li>
                    <h3 className='text-xl text-gray-500 my-1'>消息提示</h3>
                    <h4 className='text-lg text-gray-500 my-2'>type（success、info、warning、error）</h4>
                    <div className='flex items-center space-x-2 my-4'>
                        <WButton handleClick={() => addMsg('Hello World' + ++count, 'success', 3000)}>
                            消息提示success
                        </WButton>
                        <WButton handleClick={() => addMsg('Hello World' + ++count, 'info', 3000)}>
                            消息提示info
                        </WButton>
                        <WButton handleClick={() => addMsg('Hello World' + ++count, 'warning', 3000)}>
                            消息提示warning
                        </WButton>
                        <WButton handleClick={() => addMsg('Hello World' + ++count, 'error', 3000)}>
                            消息提示error
                        </WButton>
                    </div>
                </li>
            </ul>
        </div>
    );
}
