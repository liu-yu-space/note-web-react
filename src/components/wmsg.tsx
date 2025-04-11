import { CircleCheck, CircleX, CircleAlert, Info } from 'lucide-react';
import ReactDOM from 'react-dom';
// import { useMsgContext } from './createContext';
import { useState, useEffect } from 'react';
// 导入新的 store 钩子
import { useMessage } from '@/store';
import { MessageItem } from '@/types';

// 消息组件
const IconMap = {
    info: {
        color: 'bg-blue-500',
        icon: <Info size={16} />,
    },
    success: {
        color: 'bg-green-500',
        icon: <CircleCheck size={16} />,
    },
    warning: {
        color: 'bg-yellow-500',
        icon: <CircleAlert size={16} />,
    },
    error: {
        color: 'bg-red-400',
        icon: <CircleX size={16} />,
    },
} as const;

function WMsg() {
    const { msgList } = useMessage();
    
    // 跟踪每条消息的状态
    interface AnimatedMessage extends MessageItem {
        isVisible: boolean;
    }

    const [animatedMessages, setAnimatedMessages] = useState<AnimatedMessage[]>([]);

    // 当 msgList 更新时，添加新消息到动画消息列表
    useEffect(() => {
        // 找出新增的消息
        const newMessages = msgList.filter(
            msg => !animatedMessages.some(aMsg => aMsg.id === msg.id)
        );
        // 给新消息添加动画状态
        if (newMessages.length > 0) {
            const newAnimatedMessages = newMessages.map(msg => ({
                ...msg,
                isVisible: true,
            }));

            setAnimatedMessages(prev => [...prev, ...newAnimatedMessages]);
        }
        // 如果有消息被移除，让它们先播放淡出动画
        const removedMsgIds = animatedMessages
            .filter(aMsg => !msgList.some(msg => msg.id === aMsg.id) && aMsg.isVisible)
            .map(msg => msg.id);
        if (removedMsgIds.length > 0) {
            setAnimatedMessages(prev =>
                prev.map(msg =>
                    removedMsgIds.includes(msg.id) ? { ...msg, isVisible: false } : msg
                )
            );

            // 动画结束后从状态中移除
            setTimeout(() => {
                setAnimatedMessages(prev => prev.filter(msg => !removedMsgIds.includes(msg.id)));
            }, 300); // 和你的CSS动画持续时间一致
        }
    }, [msgList, animatedMessages]);

    if (animatedMessages.length === 0) return null;

    return ReactDOM.createPortal(
        <div className="fixed z-100 top-6 right-[50%] translate-x-[50%] flex flex-col gap-2">
            {animatedMessages.map(({ id, text, type, isVisible }) => (
                <div
                    className={`text-white flex shadow-lg rounded-sm px-4 py-2 gap-2 items-center min-w-40 max-w-sm 
                        ${IconMap[type].color} ${isVisible ? 'animate-msg-show' : 'animate-msg-hide'}`}
                    key={id}
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
