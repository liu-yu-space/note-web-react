import { createContext } from 'react';
import { StoreState } from '@/types';

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