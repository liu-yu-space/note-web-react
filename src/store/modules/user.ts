import { useState, useCallback } from 'react';

export function useUserState() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const login = useCallback(() => {
    // 实现登录逻辑
    // const response = await api.login(credentials);
    // setUserInfo(response.data.user);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserInfo(null);
  }, []);

  return {
    isLoggedIn,
    userInfo,
    login,
    logout
  };
}