import { useState, useCallback, useEffect } from 'react';
import http from '@/lib/http';
import type { LoginInfo } from '@/types';

// 本地存储的键名
const STORAGE_KEY = {
    IS_LOGGED_IN: 'app_is_logged_in',
    USER_INFO: 'app_user_info',
};

interface userDataType {
    name: string;
}

export function useUserState() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<userDataType | null>(null);

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem(STORAGE_KEY.IS_LOGGED_IN);
        const storedUserInfo = localStorage.getItem(STORAGE_KEY.USER_INFO);

        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
        }

        if (storedUserInfo) {
            try {
                const parsedUserInfo = JSON.parse(storedUserInfo) as userDataType | null;
                setUserInfo(parsedUserInfo);
            } catch (error) {
                console.error('Failed to parse user info from storage:', error);
                // 如果解析失败，清除可能损坏的数据
                localStorage.removeItem(STORAGE_KEY.USER_INFO);
            }
        }
    }, []);

    const login = useCallback(async (userInfo: LoginInfo) => {
        let res: { success: boolean } = { success: false };
        try {
            res = await http<{ success: boolean }>('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(userInfo),
            });
            if (res.success) {
                const userData = { name: userInfo.name };

                // 更新状态
                setUserInfo(userData);
                setIsLoggedIn(true);

                // 保存到本地存储
                localStorage.setItem(STORAGE_KEY.IS_LOGGED_IN, 'true');
                localStorage.setItem(STORAGE_KEY.USER_INFO, JSON.stringify(userData));
            }
        } catch (error) {
            console.error('Login error:', error);
        }
        return Promise.resolve(res);
    }, []);

    const logout = useCallback(async () => {
        const res = await http<{ status: number }>('/api/auth/logout', {
            method: 'POST',
        });
        if (res.status === 200) {
            setIsLoggedIn(false);
            setUserInfo(null);

            // 清除本地存储
            localStorage.removeItem(STORAGE_KEY.IS_LOGGED_IN);
            localStorage.removeItem(STORAGE_KEY.USER_INFO);

            return true;
        } else {
            return new Error('退出失败');
        }
    }, []);

    return {
        isLoggedIn,
        userInfo,
        login,
        logout,
    };
}
