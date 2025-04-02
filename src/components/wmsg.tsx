import { CircleCheck, CircleX, CircleAlert, Info } from 'lucide-react';
import { useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';

// 创建一个上下文用来管理全局消息
interface GlobalMsgContextType {
    text: string, 
    type: 'error' | 'success' | 'warning' | 'info'
    duration: number, 
}
interface MsgContextType {
    msgList: GlobalMsgContextType[];
    addMsg: (text: string, type?: GlobalMsgContextType['type'], duration?: number) => void;
}
const GlobalMsgContext = createContext<MsgContextType>({
    msgList: [],
    addMsg: () => { /* 无操作函数，在 Provider 中实现实际功能 */},
});
const useMsgContext = () => useContext(GlobalMsgContext);

// 创建一个全局消息提供者，提供一个消息列表和一个添加消息的方法
function GlobalMsgProvider({ children }: { children: React.ReactNode}) {

    const [msgList, setMsgList] = useState<GlobalMsgContextType[]>([]);
    const addMsg = (text: string, type: GlobalMsgContextType['type'] = 'info', duration = 3000) => {
        const msg = { text, duration, type };
        setMsgList([...msgList, msg]);
        setTimeout(() => {
            setMsgList(msgList.filter(m => m !== msg));
        }, duration);
    }
    return <GlobalMsgContext value={{ msgList, addMsg }}>
        {children}
    </GlobalMsgContext>
}
 
// 消息组件
const IconMap = {
    info: {
        color: 'bg-blue-600',
        icon: <Info size={16}/>
    },
    success: {
        color: 'bg-green-600',
        icon: <CircleCheck size={16}/>
    },
    warning: {
        color: 'bg-yellow-600',
        icon: <CircleAlert size={16}/>
    },
    error: {
        color: 'bg-red-600',
        icon: <CircleX size={16}/>
    }
} as const;

function WMsg() {
    const { msgList } = useMsgContext();

    if (msgList.length === 0) return null;
  
    return ReactDOM.createPortal(
        <div className='fixed z-100 top-10 right-[50%] translate-x-[50%] flex flex-col gap-2'>     
            {msgList.map(({ text, type }, index) => <div 
                className={`text-white animate-msg-show flex shadow-lg rounded-sm px-4 py-2 gap-2 items-center ${IconMap[type].color}`} 
                key={index}
            >
                <div className={``}>
                    {IconMap[type].icon}
                </div>
                <div className="text-sm">{text}</div>
            </div>)}
        </div>,
        document.body
    );
}

export { GlobalMsgProvider, useMsgContext,  WMsg};