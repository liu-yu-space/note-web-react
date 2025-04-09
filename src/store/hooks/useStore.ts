import { use } from 'react';
import { StoreContext } from '../createContext';

// 访问整个store的hook
export function useStore() {
  return use(StoreContext);
}

// 访问消息状态的hook
export function useMessage() {
  const { message } = use(StoreContext);
  return message;
}

// 访问用户状态的hook
export function useUser() {
  const { user } = use(StoreContext);
  return user;
}

// 访问主题状态的hook
export function useTheme() {
  const { theme } = use(StoreContext);
  return theme;
}

// 访问布局状态的hook
export function useLayout() {
  const { layout } = use(StoreContext);
  return layout;
}