import { useState, useCallback } from 'react';
import http from '@/lib/http';
import type { LoginInfo } from '@/types';

export function useUserState() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<{ name: string } | null>(null);

    const login = useCallback(async (userInfo: LoginInfo) => {
        try {
            const res = await http<{ status: number }>('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(userInfo),
            });
            if (res.status === 200) {
                setUserInfo({
                    name: userInfo.name,
                });
                setIsLoggedIn(true);
                return { success: true };
            } else {
                return { success: false, message: '登录失败' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: '网络错误' };
        }
    }, []);

    const logout = useCallback(async () => {
        const res = await http<{ status: number }>('/api/auth/logout', {
            method: 'POST',
        });
        if (res.status === 200) {
            setIsLoggedIn(false);
            setUserInfo(null);
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
