import { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import LoginPerson from '@/assets/imgs/login-person.jpg';
import { WButton, WInput } from '../../components/index.tsx';
import { useUser } from '@/store';
import { useMessage } from '@/store';

export default function Home() {
    const navigate = useNavigate();
    const { login } = useUser();
    const { addMsg } = useMessage();
    const [, formAction] = useActionState(async (_: void | null, formData: FormData) => {
        // 处理表单数据
        const name = formData.get('name') as string;
        const password = formData.get('password') as string;
        if (!name || !password) {
            addMsg('请输入用户名和密码', 'error');
        }
        const res = await login({ name, password });
        if (res.success) {
            void navigate('/note');
        } else {
            addMsg('登录失败，用户名或密码错误', 'error');
        }
    }, null);

    return (
        <section className="h-dvh flex justify-center items-center bg-[url(@/assets/imgs/login-bg.webp)] bg-cover bg-center">
            <div className="bg-white p-8 rounded-lg shadow-xl h-100 w-180 flex">
                <img src={LoginPerson} alt="" className="w-60 shrink-[0] mx-9" />
                <div className="flex flex-col justify-center items-center w-100">
                    <h1 className="text-xl display-flex justify-center align-middle">
                        学而时习之,不亦说乎！
                    </h1>
                    <div className="text-sm flex flex-col items-center mt-5">
                        <form className="flex flex-col items-center" action={formAction}>
                            <div className="flex w-60 mt-4">
                                <WInput
                                    placeholder="用户名"
                                    size="md"
                                    childrenPosition="left"
                                    name="name"
                                >
                                    <User size={18} />
                                </WInput>
                            </div>
                            <div className="flex w-60 mt-4 mb-10 ">
                                <WInput
                                    name="password"
                                    placeholder="密码"
                                    size="md"
                                    type="password"
                                    childrenPosition="left"
                                >
                                    <Lock size={18} />
                                </WInput>
                            </div>
                            <div className="flex gap-4">
                                <WButton originalType="submit">点击登录</WButton>
                                <WButton
                                    onClick={() => {
                                        void navigate('/note');
                                    }}
                                >
                                    直接进入主页
                                </WButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
