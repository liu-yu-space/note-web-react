import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import LoginPerson from "@/assets/imgs/login-person.jpg";
import { WButton } from "../../components/index.tsx";
import http from "@/network/http.ts";

export default function Home() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        void http("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                name,
                password,
            }),
        }).then(() => {
            void navigate("/");
        });
    };
    return (
        <section className="h-dvh flex justify-center items-center bg-[url(@/assets/login-bg.webp)] bg-cover bg-center">
            <div className="bg-white p-8 rounded-lg shadow-xl h-100 w-180 flex">
                <img src={LoginPerson} alt="" className="w-60 shrink-[0] mx-9" />
                <div className="flex flex-col justify-center items-center w-100">
                    <h1 className="text-xl display-flex justify-center align-middle">
                        学而时习之,不亦说乎！
                    </h1>
                    <p className="text-sm flex flex-col items-center mt-5">
                        <label className="mt-4 border border-gray-300 w-60 flex items-center px-2 py-1.5 rounded-[4px]">
                            <User className="w-5 h-5 text-(--color-main) mr-1" />
                            <input
                                type="text"
                                placeholder="用户名"
                                className="grow p-1 outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label className="flex items-center mt-4 mb-10 border border-gray-300 w-60 px-2 py-1.5 rounded-[4px]">
                            <Lock className="w-5 h-5 text-(--color-main) mr-1" />
                            <input
                                type="password"
                                placeholder="密码"
                                className="grow p-1 outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <WButton handleClick={handleClick}>登录</WButton>
                    </p>
                </div>
            </div>
        </section>
    );
}
