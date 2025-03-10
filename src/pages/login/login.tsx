import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";

export default function Home() {
    const navigate = useNavigate();
    const linlB = () => {
        // 直接跟我们定义的path
        void navigate("/");
    };
    return (
        <section className="h-dvh flex justify-center items-center bg-[url(@/assets/login-bg1.png)] bg-cover bg-center">
            <div className="bg-white/80 p-8 rounded-lg shadow-lg h-100 w-180">
                <img src="" alt="" />
                <h1 className="text-2xl display-flex justify-center align-middle">
                    学而时习之,不亦说乎！
                </h1>
                <p className="text-sm flex flex-col items-center mt-15">
                    <label htmlFor="" className="block mt-4 border-b border-gray-300 w-90">
                        <User className="w-6 h-6 text-(--color-main)" />
                        <input type="text" />
                    </label>
                    <label htmlFor="" className="block mt-4 border-b border-gray-300 w-90">
                        <Lock className="w-6 h-6 text-(--color-main)" />
                        <input type="password" />
                    </label>
                    <button
                        type="button"
                        className="border rounded-[4px] px-4 py-1 text-sm mt-10"
                        onClick={linlB}
                    >
                        登 录
                    </button>
                </p>
            </div>
        </section>
    );
}
