import BookGril from '@/assets/imgs/book-gril1.png';
import { WButton } from '@/components';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const handleClick = (route: string) => {
        void navigate(route); // 跳转到 /about 路由
    };

    return (
        <main className="h-full overflow-auto">
            <section className="h-full flex justify-center items-center gap-10 p-10 min-h-[calc(100vh-100px)]">
                <div>
                    <span className="text-primary">其进锐者，其退速。- 孟子</span>
                    <div className="mt-10 flex gap-5">
                        <WButton onClick={() => handleClick('/note')} size="lg" type="default">
                            查看笔记
                        </WButton>
                        <WButton onClick={() => handleClick('/exercises')} size="lg" type="default">
                            进入练习
                        </WButton>
                    </div>
                </div>
                <img src={BookGril} alt="" className="w-3/12" />
            </section>
        </main>
    );
}
