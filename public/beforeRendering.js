// 主题模式需要在渲染前从缓存取出并设置好以避免fouc
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || savedTheme === 'light') {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
}