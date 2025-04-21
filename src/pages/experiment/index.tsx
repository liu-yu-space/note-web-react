import { WButton, WInput, WSwitch, WTag, WSelect, WEmpty } from '@/components';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useMessage } from '@/store';

let count = 0;
export default function Experiment() {
    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked);
    }

    const selectOptions = [
        { id: 1, name: '选项1' },
        { id: 2, name: '选项2' },
        { id: 3, name: '选项3' },
        { id: 4, name: '选项4' },
        { id: 5, name: '选项5' },
        { id: 6, name: '选项6' },
        { id: 7, name: '选项7' },
        { id: 8, name: '选项8' },
        { id: 9, name: '选项9' },
        { id: 10, name: '选项10' },
        { id: 11, name: '选项11' },
        { id: 12, name: '选项12' },
        { id: 13, name: '选项13' },
    ];
    const [selectValue, setSelectValue] = useState<number[]>([1]);
    const [mutiSelectValue, setMutiSelectValue] = useState<number[]>([1]);

    const { addMsg } = useMessage();

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/files/upload');
            xhr.onload = () => {
                if (xhr.status === 200) {
                    addMsg('上传成功', 'success');
                } else {
                    addMsg('上传失败', 'error');
                }
            };
            xhr.send(formData);
        }
    };
    return (
        <div className="p-10 h-full overflow-auto">
            <ul>
                <li>
                    <h3 className="text-xl text-gray-500 my-2">按钮</h3>
                    <h4 className="text-lg text-gray-500 my-2">size（xs、sm、md(default)、lg）</h4>
                    <div className="flex items-center space-x-2 my-4">
                        <WButton size="xs">
                            <Plus size="16" /> Hello World
                        </WButton>
                        <WButton size="sm">
                            <Plus size="16" /> Hello World
                        </WButton>
                        <WButton>
                            <Plus size="16" /> Hello World
                        </WButton>
                        <WButton size="lg">
                            <Plus size="16" /> Hello World
                        </WButton>
                    </div>
                    <h4 className="text-lg text-gray-500 my-2">type（default、text）</h4>
                    <div className="flex items-center space-x-2 my-4">
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
                    <h3 className="text-xl text-gray-500 my-1">输入框</h3>
                    <h4 className="text-lg text-gray-500 my-2">
                        size（xs、sm、md(default)、lg）
                        <span className="text-red-300">参考按钮size</span>
                    </h4>
                    <div className="w-64 flex items-center space-x-2 my-4">
                        <WInput placeholder="搜索" childrenPosition="right">
                            <Search size="18" color="#aaa" />
                        </WInput>
                    </div>
                </li>
                <li>
                    <h3 className="text-xl text-gray-500 my-1">开关</h3>
                    <div className="flex items-center space-x-2 my-4">
                        <WSwitch checked={checked} onChange={handleClick} />
                        <WSwitch
                            checked={checked}
                            onText="打开"
                            offText="关闭"
                            onChange={handleClick}
                        />
                    </div>
                </li>
                <li>
                    <h3 className="text-xl text-gray-500 my-1">标签</h3>
                    <div className="flex items-center space-x-2 my-4">
                        <WTag hDegree={360} text="标签1" />
                        <WTag hDegree={180} text="标签2" />
                        <WTag hDegree={90} text="标签3" />
                    </div>
                </li>
                <li>
                    <h3 className="text-xl text-gray-500 my-1">选择器</h3>
                    <h4 className="text-lg text-gray-500 my-2">
                        size（xs、sm、md(default)、lg）
                        <span className="text-red-300">参考按钮size</span>
                    </h4>
                    <h4 className="text-lg text-gray-500 my-2">multi（true、false）</h4>
                    <div className="w-96 flex items-center space-x-2 my-4">
                        <WSelect
                            options={selectOptions}
                            selectedIds={mutiSelectValue}
                            multi={true}
                            canCreate={true}
                            onChange={ids => setMutiSelectValue(ids)}
                        />
                        <WSelect
                            options={selectOptions}
                            selectedIds={selectValue}
                            multi={false}
                            onChange={ids => setSelectValue(ids)}
                        />
                    </div>
                </li>
                <li>
                    <h3 className="text-xl text-gray-500 my-1">消息提示</h3>
                    <h4 className="text-lg text-gray-500 my-2">
                        type（success、info、warning、error）
                    </h4>
                    <div className="flex items-center space-x-2 my-4">
                        <WButton onClick={() => addMsg('Hello World' + ++count, 'success', 3000)}>
                            消息提示success
                        </WButton>
                        <WButton onClick={() => addMsg('Hello World' + ++count, 'info', 3000)}>
                            消息提示info
                        </WButton>
                        <WButton onClick={() => addMsg('Hello World' + ++count, 'warning', 3000)}>
                            消息提示warning
                        </WButton>
                        <WButton
                            onClick={() =>
                                addMsg(
                                    '测试超长消息提示测试超长消息提示测试超长消息提示测试超长消息提示测试超长消息提示测试超长消息提示' +
                                        ++count,
                                    'error',
                                    10000
                                )
                            }
                        >
                            消息提示error
                        </WButton>
                    </div>
                </li>
                <li>
                    <h3 className="text-xl text-gray-500 my-1">暂无数据</h3>
                    <h4 className="text-lg text-gray-500 my-2">size（xs、sm、md(default)、lg）</h4>
                    <div className="flex items-center space-x-2 my-4">
                        <WEmpty size="xs" />
                        <WEmpty size="sm" />
                        <WEmpty size="md" />
                        <WEmpty size="lg" />
                    </div>
                </li>
                <li>
                    <h3 className="text-xl text-gray-500 my-1">上传</h3>
                    <p className="text-gray-500 my-2">
                        <input
                            type="file"
                            accept=".jpg,.png"
                            className="border rounded p-2"
                            onChange={handleUpload}
                        />
                    </p>
                </li>
            </ul>
        </div>
    );
}
