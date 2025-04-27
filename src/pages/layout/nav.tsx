import { Info, Settings, LogOut, LogIn } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import logo from '@/assets/imgs/open-book.svg';
import WButton from '@/components/wbutton';
import { Link } from 'react-router-dom';
import { useLayout, useUser } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '@/store';

const Navbar = () => {
    const navigate = useNavigate();
    const { layout } = useLayout();
    const { isLoggedIn, logout } = useUser();
    const location = useLocation();
    const { addMsg } = useMessage();

    // 判断是否是登录页面或 404 页面
    if (['/login', '/404'].includes(location.pathname)) {
        return null; // 如果是登录或404页面，不渲染导航栏
    }

    let className =
        'flex items-center justify-between bg-gray-100 shrink-0 z-50 transition-all duration-300 ease-in-out shadow-xl opacity-100';

    // 导航栏位置
    if (layout.position === 'left') {
        className += ' flex-col h-full py-3 w-16';
    } else if (layout.position === 'top') {
        className += ' w-full px-3 h-16';
    }

    // 导航栏状态
    if (layout.state === 'always') {
        className += '';
    } else if (layout.state === 'auto') {
        className +=
            ' fixed ' +
            (layout.position === 'left'
                ? '-translate-x-[calc(100%)] hover:-translate-x-0'
                : '-translate-y-[calc(100%-0px)] hover:-translate-y-0');
    }

    // 退出登录
    const handleLogout = async () => {
        const res = await logout();
        if (res.success) {
            void navigate('/login');
        } else {
            addMsg('退出失败', 'error');
        }
    };

    return (
        <nav className={className}>
            {layout.state === 'auto' && (
                <div
                    className={`absolute ${
                        layout.position === 'left' ? '-right-4 h-full w-4' : '-bottom-4 w-full h-4'
                    } bg-transparent`}
                ></div>
            )}
            <div className={`flex ${layout.position === 'left' ? 'flex-col' : ''} gap-4`}>
                <WButton type="text">
                    <Link to="/">
                        <img src={logo} alt="" className="w-10" />
                    </Link>
                </WButton>
                <WButton type="text">
                    <Link to="/note">笔记</Link>
                </WButton>
                <WButton type="text">
                    <Link to="/exercises">习题</Link>
                </WButton>
                <WButton type="text">
                    <Link to="/demo">demo</Link>
                </WButton>
                <WButton type="text">
                    <Link to="/experiment">组件</Link>
                </WButton>
            </div>
            <div className={`flex ${layout.position === 'left' ? 'flex-col' : ''} gap-4`}>
                <WButton type="text">
                    <Link to="/setting">
                        <Settings size={20} />
                    </Link>
                </WButton>
                <WButton type="text">
                    <Link to="/aboutme">
                        <Info size={20} />
                    </Link>
                </WButton>
                <WButton type="text" onClick={() => void handleLogout()}>
                    {isLoggedIn ? <LogOut size={20} /> : <LogIn size={20} />}
                </WButton>
            </div>
        </nav>
    );
};

export default Navbar;
