import { Info, Settings, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import logo from '@/assets/imgs/open-book.svg';
import WButton from '@/components/wbutton';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    // 判断是否是登录页面或 404 页面
    if (['/login', '/404'].includes(location.pathname)) {
        return null; // 如果是登录或404页面，不渲染导航栏
    }

    return (
        <nav
            className={`flex flex-col items-center justify-between py-3 bg-gray-100 
            shrink-0 fixed h-full -translate-x-[calc(100%-10px)] hover:-translate-x-0 z-50 border-r-[10px] border-r-[transparent]
            transition-all duration-300 ease-in-out shadow-xl`}
        >
            <div className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-4">
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
                <WButton
                    type="text"
                    handleClick={() => {
                        console.log('退出登录');
                        window.location.href = '/login';
                    }}
                >
                    <LogOut size={20} />
                </WButton>
            </div>
        </nav>
    );
};

export default Navbar;
