import { CircleCheck, CircleX, CircleAlert, Info } from 'lucide-react';
import ReactDOM from 'react-dom';
import { useMsgContext } from './createContext';

// 消息组件
const IconMap = {
    info: {
        color: 'bg-blue-600',
        icon: <Info size={16} />,
    },
    success: {
        color: 'bg-green-600',
        icon: <CircleCheck size={16} />,
    },
    warning: {
        color: 'bg-yellow-600',
        icon: <CircleAlert size={16} />,
    },
    error: {
        color: 'bg-red-600',
        icon: <CircleX size={16} />,
    },
} as const;

function WMsg() {
    const { msgList } = useMsgContext();

    if (msgList.length === 0) return null;

    return ReactDOM.createPortal(
        <div className="fixed z-100 top-10 right-[50%] translate-x-[50%] flex flex-col gap-2">
            {msgList.map(({ text, type }, index) => (
                <div
                    className={`text-white animate-msg-show flex shadow-lg rounded-sm px-4 py-2 gap-2 items-center ${IconMap[type].color}`}
                    key={index}
                >
                    <div className={``}>{IconMap[type].icon}</div>
                    <div className="text-sm">{text}</div>
                </div>
            ))}
        </div>,
        document.body
    );
}

export default WMsg;
