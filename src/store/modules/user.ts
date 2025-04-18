import { useState, useCallback } from 'react';
import http from '@/lib/http';
import type { LoginInfo } from '@/types';

export function useUserState() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<{ name: string } | null>(null);

    const login = useCallback(async (userInfo: LoginInfo) => {
        let res: { success: boolean } = { success: false };
        try {
            res = await http<{ success: boolean }>('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(userInfo),
            });
            if (res.success) {
                setUserInfo({
                    name: userInfo.name,
                });
                setIsLoggedIn(true);
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
