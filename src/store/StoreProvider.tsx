import { useMemo, useEffect } from 'react';
import { StoreContext } from './createContext';
import { useMessageState, messageManager } from './modules/message';
import { useUserState } from './modules/user';
import { useThemeState } from './modules/theme';
import { useLayoutState } from './modules/layout';

function StoreProvider({ children }: { children: React.ReactNode }) {
  // 获取各模块状态
  const messageState = useMessageState();
  const userState = useUserState();
  const themeState = useThemeState();
  const layoutState = useLayoutState();

  // 将添加消息方法绑定到全局对象
  useEffect(() => {
    messageManager.addMsg = messageState.addMsg;
  }, [messageState.addMsg]);

  // 合并所有状态
  const store = useMemo(
    () => ({
      message: messageState,
      user: userState,
      theme: themeState,
      layout: layoutState,
    }),
    [messageState, userState, themeState, layoutState]
  );

  return (
    <StoreContext value={store}>
      {children}
    </StoreContext>
  );
}

export default StoreProvider;