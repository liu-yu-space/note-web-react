// 定义消息类型
export type MessageType = 'error' | 'success' | 'warning' | 'info';

// 定义消息项类型
export interface MessageItem {
    id: string;
    text: string;
    type: MessageType;
    duration: number;
}

// 定义全局状态类型
export interface UserInfo {
    name: string;
}

export interface LoginInfo {
    name: string;
    password: string;
}

export interface StoreState {
    message: {
        msgList: MessageItem[];
        addMsg: (text: string, type?: MessageType, duration?: number) => void;
    };
    // 可以添加其他模块的状态
    user: {
        isLoggedIn: boolean;
        userInfo: UserInfo | null;
        login: (loginInfo: LoginInfo) => Promise<{ success: boolean; message?: string }>;
        logout: () => Promise<{ success: boolean; message?: string }>;
    };
    theme: {
        mode: 'light' | 'dark';
        toggleTheme: () => void;
    };
    layout: {
        layout: {
            position: 'left' | 'top';
            state: 'always' | 'auto';
        };
        toggleLayout: (type: 'position' | 'state', value: string) => void;
    };
}
