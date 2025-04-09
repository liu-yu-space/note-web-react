import { useState, useCallback, useEffect } from 'react';

export function useThemeState() {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    // 初始化从localStorage读取主题
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            setMode(savedTheme);
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setMode(prev => {
            const newMode = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newMode);
            // 在页面加载或更改主题时，最好在``head''中添加内联以避免fouc
            document.documentElement.classList.toggle('dark', newMode === 'dark');
            return newMode;
        });
    }, []);

    return {
        mode,
        toggleTheme,
    };
}
