// 优先级：用户选择的主题模式 > 缓存的主题模式 > 浏览器的深色/浅色模式

export default function toggleMode(mode: 'light' | 'dark' | 'system'): void {
    let currentMode;

    // 如果是首次加载页面，则从localStorage中获取用户选择的主题模式
    if (!mode) {
        currentMode = localStorage.getItem('theme') ?? 'system';
    } else {
        currentMode = mode;
    }

    // 如果用户选择system，则使用浏览器的深色/浅色模式
    if (currentMode === 'system') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentMode = 'dark';
        } else {
            currentMode = 'light';
        }
        localStorage.removeItem('theme');
    } else {
        localStorage.setItem('theme', currentMode);
    }

    // 在页面加载或更改主题时，最好在``head''中添加内联以避免fouc
    document.documentElement.classList.toggle('dark', currentMode === 'dark');
}
