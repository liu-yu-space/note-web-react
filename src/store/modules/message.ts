import { useState, useCallback } from 'react';
import { MessageItem, MessageType } from '@/types';
import { idCreator } from '@/utils/tools';

export function useMessageState() {
  const [msgList, setMsgList] = useState<MessageItem[]>([]);
  
  const addMsg = useCallback(
    (text: string, type: MessageType = 'info', duration = 3000) => {
      const msg = { id: idCreator(), text, duration, type };
      setMsgList(prev => [...prev, msg]);
      setTimeout(() => {
        setMsgList(prev => prev.filter(m => m !== msg));
      }, duration);
    },
    [setMsgList]
  );

  return {
    msgList,
    addMsg,
  };
}

// 全局对象
export const messageManager: { addMsg: (text: string, type?: MessageType, duration?: number) => void }= {
  addMsg: () => {
    // 默认实现为空函数
  },
};