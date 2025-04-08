const navbarManage: {
    changeNavbarPosition: (position: 'left' | 'top') => void;
    changeNavbarState: (state: 'always' | 'auto') => void;
} = {
    changeNavbarPosition: () => {
        console.warn('导航栏管理器尚未初始化.');
    },
    changeNavbarState: () => {
        console.warn('导航栏管理器尚未初始化.');
    },
};

export default navbarManage;