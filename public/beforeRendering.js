// 主题模式需要在渲染前从缓存取出并设置好以避免fouc
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    let calcMode = savedTheme;
    if (calcMode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        calcMode = isDark ? 'dark' : 'light';
    }
    document.documentElement.classList.toggle('dark', calcMode === 'dark');
}
