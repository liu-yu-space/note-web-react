import { Info, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/imgs/open-book.svg";
import WButton from "@/components/wbutton";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const location = useLocation();

    const [status, setStatus] = useState(false);

    // 判断是否是登录页面或 404 页面
    if (location.pathname === "/login" || location.pathname === "/404") {
        return null; // 如果是登录或404页面，不渲染导航栏
    }

    function handleClick() {
        console.log("click");
        setStatus(!status);
    }

    return (
        <nav className={`flex flex-col items-center justify-between py-3 px-2 bg-gray-100 
            shrink-0 fixed h-full ${status ? "-translate-x-[100%]" : ""} z-50`}>
            <div className="flex flex-col gap-4">
                <WButton type="text">
                    <Link to="/"><img src={logo} alt="" className="w-10" /></Link>
                </WButton>
                <WButton type="text">
                    <Link to="/note">笔记</Link>
                </WButton>
                <WButton type="text">
                    <Link to="/demo">Demo</Link>
                </WButton>
            </div>
            <div className="flex flex-col gap-4">
                <WButton type="text">
                    <Link to="/setting"><Settings size={20} strokeWidth={1} /></Link>
                </WButton>
                <WButton type="text">
                    <Link to="/aboutme"><Info size={20} strokeWidth={1} /></Link>
                </WButton>
            </div>
            <div className="absolute -right-7 top-[calc(50%-2rem)] bg-gray-100 py-1 rounded-sm" onClick={handleClick}>
                {status ? 
                (<ChevronRight size={32} strokeWidth={1} />)
                :
                (<ChevronLeft size={32} strokeWidth={1} />)
                }
            </div>
        </nav>
    );
};

export default Navbar;
