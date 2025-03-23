import { useLocation } from "react-router-dom";
import logo from "@/assets/imgs/open-book.svg";
import WButton from "@/components/wbutton";
import { Link } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    // 判断是否是登录页面或 404 页面
    if (location.pathname === "/login" || location.pathname === "/404") {
        return null; // 如果是登录或404页面，不渲染导航栏
    }

    return (
        <nav className="flex items-center justify-between py-2 px-4 border-b border-gray-200 bg-white">
            <h3 className="flex items-center gap-2">
                <img src={logo} alt="" className="w-10" />
                <b>LiuYu`s Note</b>
            </h3>
            <div className="flex gap-4">
                <WButton type="text">
                    <Link to="/">首页</Link>
                </WButton>
                <WButton type="text">
                    <Link to="/note">笔记</Link>
                </WButton>
                <WButton type="text">
                    <Link to="/demo">Demo</Link>
                </WButton>
                <WButton type="text">
                    <Link to="/aboutme">关于作者</Link>
                </WButton>
            </div>
        </nav>
    );
};

export default Navbar;
