import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import LoginPerson from '@/assets/imgs/login-person.jpg';
import { WButton, WInput } from '../../components/index.tsx';
import { useUserState } from '@/store/modules/user.ts';
import { useMessage } from '@/store';

export default function Home() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUserState();
    const { addMsg } = useMessage();

    const handleClick = () => {
        void login({ name, password }).then(res => {
            if (res) {
                addMsg('登录成功', 'success');
                void navigate('/note');
            } else {
                addMsg('登录失败', 'error');
            }
        });
    };

    return (
        <section className="h-dvh flex justify-center items-center bg-[url(@/assets/imgs/login-bg.webp)] bg-cover bg-center">
            <div className="bg-white p-8 rounded-lg shadow-xl h-100 w-180 flex">
                <img src={LoginPerson} alt="" className="w-60 shrink-[0] mx-9" />
                <div className="flex flex-col justify-center items-center w-100">
                    <h1 className="text-xl display-flex justify-center align-middle">
                        学而时习之,不亦说乎！
                    </h1>
                    <p className="text-sm flex flex-col items-center mt-5">
                        <div className="flex w-60 mt-4">
                            <WInput
                                placeholder="用户名"
                                size="md"
                                onChange={e => setName(e.target.value)}
                                childrenPosition="left"
                            >
                                <User size={18} className="text-(--color-main)" />
                            </WInput>
                        </div>
                        <div className="flex w-60 mt-4 mb-10 ">
                            <WInput
                                placeholder="密码"
                                size="md"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                childrenPosition="left"
                            >
                                <Lock size={18} className="text-(--color-main)" />
                            </WInput>
                        </div>
                        <WButton onClick={handleClick}> 点击登录 </WButton>
                    </p>
                </div>
            </div>
        </section>
    );
}
