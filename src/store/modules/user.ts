import { useState, useCallback, useEffect } from 'react';
import { useHttp } from '@/hooks/useHttp';
import { useMessage } from '@/store';
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
    const http = useHttp();
    const { addMsg } = useMessage();

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

        // 监听 401 事件
        const handleAuthLogout = () => {
            if (isLoggedIn) {
                addMsg('登录已过期，请重新登录', 'error', 3000);
                setIsLoggedIn(false);
                setUserInfo(null);
                localStorage.removeItem(STORAGE_KEY.IS_LOGGED_IN);
                localStorage.removeItem(STORAGE_KEY.USER_INFO);
            }
        };
        window.addEventListener('auth-logout', handleAuthLogout);

        // 检查登录状态
        const checkLoginStatus = () => {
            return void http({
                url: `/api/auth/profile`,
                method: 'GET',
            });
        };
        window.addEventListener('pageshow', checkLoginStatus);

        return () => {
            window.removeEventListener('pageshow', checkLoginStatus);
            window.removeEventListener('auth-logout', handleAuthLogout);
        };
    }, [http, addMsg, isLoggedIn]);

    const login = useCallback(
        async (userInfo: LoginInfo) => {
            let res: { success: boolean } = { success: false };
            try {
                const result = await http({
                    url: '/api/auth/login',
                    method: 'POST',
                    body: JSON.stringify(userInfo),
                });
                res = result as { success: boolean };
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
        },
        [http]
    );

    const logout = useCallback(async () => {
        let res: { success: boolean } = { success: false };
        try {
            const result = await http({
                url: '/api/auth/logout',
                method: 'POST',
            });
            res = result as { success: boolean };
            if (res.success) {
                setIsLoggedIn(false);
                setUserInfo(null);

                // 清除本地存储
                localStorage.removeItem(STORAGE_KEY.IS_LOGGED_IN);
                localStorage.removeItem(STORAGE_KEY.USER_INFO);
            } else {
                console.error('Logout error:');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
        return res;
    }, [http]);

    return {
        isLoggedIn,
        userInfo,
        login,
        logout,
    };
}
