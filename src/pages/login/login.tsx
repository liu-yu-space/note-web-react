export default function Home() {
    return (
        <section className="text-gray-900 h-dvh flex justify-center items-center bg-[url(@/assets/login-bg1.png)] bg-cover bg-center">
            <div className="bg-white/80 p-8 rounded-lg shadow-lg h-100 w-180">
                <h1 className="text-2xl display-flex justify-center align-middle">
                    学而时习之,不亦说乎！
                </h1>
                <p className="text-sm flex flex-col items-center mt-15">
                    <label htmlFor="" className="block mt-4 border-b border-gray-300 w-90">
                        <span>用户名：</span>
                        <input type="text" />
                    </label>
                    <label htmlFor="" className="block mt-4 border-b border-gray-300 w-90">
                        <span className="w-14 inline-flex justify-end">密码：</span>
                        <input type="password" />
                    </label>
                    <button className="border rounded-[4px] px-4 py-1 text-sm mt-10">登 录</button>
                </p>
            </div>
        </section>
    );
}
