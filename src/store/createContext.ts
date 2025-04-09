import { createContext } from 'react';

// 定义全局状态类型
export interface StoreState {
  message: {
    msgList: MessageItem[];
    addMsg: (text: string, type?: MessageType, duration?: number) => void;
  };
  // 可以添加其他模块的状态
  user: {
    isLoggedIn: boolean;
    userInfo: null;
    login: () => void;
    logout: () => void;
  };
  theme: {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
  };
  layout: {
    layout: {
        position: "left" | "top";
        state: "always" | "auto";
    };
    toggleLayout: (type: "position" | "state", value: string) => void;
  }
}

// 定义消息类型
export type MessageType = 'error' | 'success' | 'warning' | 'info';

export interface MessageItem {
  id: string;
  text: string;
  type: MessageType;
  duration: number;
}

// 创建默认值
const defaultStore: StoreState = {
  message: {
    msgList: [],
    addMsg: () => {
      // 默认的添加消息函数
      console.log('addMsg function not implemented');
    },
  },
  user: {
    isLoggedIn: false,
    userInfo: null,
    login: () => {
      // 默认的登录函数
      console.log('login function not implemented');
    },
    logout: () => {
      // 默认的登出函数
      console.log('logout function not implemented');
    },
  },
  theme: {
    mode: 'light',
    toggleTheme: () => {
      // 默认的切换主题函数
      console.log('toggleTheme function not implemented');
    },
  },
  layout: {
    layout: {
        position: "left",
        state: "auto",
    },
    toggleLayout: () => {
      // 默认的切换布局函数
      console.log('toggleLayout function not implemented');
    }
  }
};

// 创建上下文
export const StoreContext = createContext<StoreState>(defaultStore);