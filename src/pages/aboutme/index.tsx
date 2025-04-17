import { Github, SquareArrowOutUpRight } from 'lucide-react';
import { WButton } from '@/components';

export default function demo() {
    return (
        <main className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl flex justify-center items-center">关于本站</h1>
                <div className="text-gray-500 mt-4 w-xl indent-[2em] break-all">
                    如果我们总想着“学以致用”，那势必需要面对不能致用时的境地。达到目的固然重要，但达到的过程也有着同样精彩的风景。
                    所以不妨试试“学以致用“之外的方法，比如“学以致乐“。孔子说：“学而时习之，不亦说乎？”。如果学习本身是一种乐趣，那么我们也不用
                    考虑“以始为终”还是“以终为终”，
                    此刻便是终点也是起点，是知行合一，也是水到渠成。这便是本站的全部目的。
                </div>
                <div className="text-sm text-gray-400 mt-4 w-xl indent-[2em] break-all flex items-center">
                    <WButton type="text">
                        <Github />
                        <a
                            href="https://github.com/liu-yu-space/note-web-react"
                            className="inline-flex items-center"
                        >
                            访问仓库
                            <SquareArrowOutUpRight size="16" />
                        </a>
                    </WButton>
                </div>
            </div>
        </main>
    );
}
