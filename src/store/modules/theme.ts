import { useState, useCallback, useEffect } from 'react';

export const THEME_OPTIONS = [
    { id: 'light', name: '浅色' },
    { id: 'dark', name: '深色' },
    { id: 'system', name: '跟随系统' },
] as const;

export type ThemeType = (typeof THEME_OPTIONS)[number]['id'];

export function useThemeState() {
    const [mode, setMode] = useState<ThemeType>('light');

    // 初始化从localStorage读取主题
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'system') {
            setMode(savedTheme);
            console.log('从localStorage读取主题:', savedTheme);
        }

        // 监听系统主题变化
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const newMode = e.matches ? 'dark' : 'light';
            console.log('系统主题变化:', newMode, '当前模式:', mode);
            if (mode === 'system') {
                console.log('系统主题变化:', newMode);
                document.documentElement.classList.toggle('dark', newMode === 'dark');
            }
        };
        mediaQuery.addEventListener('change', handleChange);

        // 清理监听器
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [mode]);

    const toggleTheme = useCallback((newMode: 'dark' | 'light' | 'system') => {
        setMode(() => {
            localStorage.setItem('theme', newMode);
            // 在页面加载或更改主题时，最好在``head''中添加内联以避免fouc
            let calcMode = newMode;
            if (calcMode === 'system') {
                const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                calcMode = isDark ? 'dark' : 'light';
            }
            document.documentElement.classList.toggle('dark', calcMode === 'dark');
            return newMode;
        });
    }, []);

    return {
        mode,
        toggleTheme,
    };
}
