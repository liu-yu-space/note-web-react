import { useContext } from 'react';
import { StoreContext } from '../createContext';

// 访问整个store的hook
export function useStore() {
  return useContext(StoreContext);
}

// 访问消息状态的hook
export function useMessage() {
  const { message } = useContext(StoreContext);
  return message;
}

// 访问用户状态的hook
export function useUser() {
  const { user } = useContext(StoreContext);
  return user;
}

// 访问主题状态的hook
export function useTheme() {
  const { theme } = useContext(StoreContext);
  return theme;
}

// 访问布局状态的hook
export function useLayout() {
  const { layout } = useContext(StoreContext);
  return layout;
}