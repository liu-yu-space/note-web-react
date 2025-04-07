import { useState, useCallback, useMemo } from 'react';
import { GlobalMsgContext } from './createContext';
import { idCreator } from '@/utils/tools';

// 创建一个上下文用来管理全局消息
interface GlobalMsgContextType {
    id: string;
    text: string;
    type: 'error' | 'success' | 'warning' | 'info';
    duration: number;
}

// 创建一个全局对象
import { globalMsgManager } from '@/utils/globalMsgManager';

// 创建一个全局消息提供者，提供一个消息列表和一个添加消息的方法
function GlobalMsgProvider({ children }: { children: React.ReactNode }) {
    const [msgList, setMsgList] = useState<GlobalMsgContextType[]>([]);
    const addMsg = useCallback(
        (text: string, type: GlobalMsgContextType['type'] = 'info', duration = 3000) => {
            const msg = { id: idCreator(), text, duration, type };
            setMsgList(prev => [...prev, msg]);
            setTimeout(() => {
                setMsgList(prev => prev.filter(m => m !== msg));
            }, duration);
        },
        [setMsgList]
    );

    // 初始化全局对象
    globalMsgManager.addMsg = addMsg;

    const contextValue = useMemo(() => ({ msgList, addMsg }), [msgList, addMsg])
    return <GlobalMsgContext value={contextValue}>{children}</GlobalMsgContext>;

}

export default GlobalMsgProvider;
