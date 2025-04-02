import { useContext, createContext } from 'react';

// 创建一个上下文用来管理全局消息
interface GlobalMsgContextType {
    text: string;
    type: 'error' | 'success' | 'warning' | 'info';
    duration: number;
}
interface MsgContextType {
    msgList: GlobalMsgContextType[];
    addMsg: (text: string, type?: GlobalMsgContextType['type'], duration?: number) => void;
}
const GlobalMsgContext = createContext<MsgContextType>({
    msgList: [],
    addMsg: () => {
        /* 无操作函数，在 Provider 中实现实际功能 */
    },
});
const useMsgContext = () => useContext(GlobalMsgContext);

export { useMsgContext, GlobalMsgContext };
