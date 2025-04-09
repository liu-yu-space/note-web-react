import { useState, useCallback, useEffect } from 'react';

export interface LayoutStateType {
    position: 'left' | 'top';
    state: 'always' | 'auto';
};

export function useLayoutState() {
    const [layout, setLayout] = useState<LayoutStateType>({
        position: 'left',
        state: 'auto',
    });

    // 初始化从localStorage读取布局
    useEffect(() => {
        const savedTheme = localStorage.getItem('layout');
        if (savedTheme) {
            setLayout(JSON.parse(savedTheme) as LayoutStateType);
        }
    }, []);

    // 切换布局
    const toggleLayout = useCallback((type: "position" | "state", value: string) => {
        setLayout(prev => {
            const newLayout = {
                ...prev,
                [type]: value,
            };
            localStorage.setItem('layout', JSON.stringify(newLayout));
            return newLayout;
        });
    }, []);

    return {
        layout,
        toggleLayout,
    };
}
