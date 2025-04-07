export const globalMsgManager: {
    addMsg: (text: string, type?: 'error' | 'success' | 'warning' | 'info', duration?: number) => void;
} = {
    addMsg: () => {
        console.warn('全局消息管理器尚未初始化.');
    },
};