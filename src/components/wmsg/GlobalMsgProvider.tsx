import { useState } from 'react';
import { GlobalMsgContext } from './createContext';

// 创建一个上下文用来管理全局消息
interface GlobalMsgContextType {
    text: string;
    type: 'error' | 'success' | 'warning' | 'info';
    duration: number;
}

// 创建一个全局消息提供者，提供一个消息列表和一个添加消息的方法
function GlobalMsgProvider({ children }: { children: React.ReactNode }) {
    const [msgList, setMsgList] = useState<GlobalMsgContextType[]>([]);
    console.log('msgList', msgList);
    const addMsg = (text: string, type: GlobalMsgContextType['type'] = 'info', duration = 3000) => {
        const msg = { text, duration, type };
        setMsgList(prev => [...prev, msg]);
        setTimeout(() => {
            setMsgList(prev => prev.filter(m => m !== msg));
        }, duration);
    };
    return <GlobalMsgContext value={{ msgList, addMsg }}>{children}</GlobalMsgContext>;
}

export default GlobalMsgProvider;
