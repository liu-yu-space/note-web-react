import { WTimeline, WButton } from "@/components";

export default function Note() {
    return (
        <div className="flex w-full h-full justify-center relative">
            <article className="w-[800px] p-8">
                <h1 className="text-xl font-bold mb-4">难说《我叫赵出息》</h1>
                <p className="mb-4">
                    出门看见风雨拍，
                    <br />
                    这步该迈 还得迈，
                    <br />
                    每步用力把脚印踩，
                    <br />
                    要踏出条道来，
                    <br />
                    寻找心中的山海，
                    <br />
                    想回 想悖 想睡 想醉，
                    <br />
                    不跪 不愧 不昧 不悔，
                    <br />
                    谁说那太阳总要落，
                    <br />
                    谁说日子要苦着过，
                    <br />
                    谁说白日作梦不会有结果，
                    <br />
                    谁说老天选的不是我，
                    <br />
                    我说太阳就不该落，
                    <br />
                    我说日子就该洒脱，
                    <br />
                    我说梦中的楼还得亲手摞，
                    <br />
                    我说我走的路就是我，
                    <br />
                    运气有借就有还，
                    <br />
                    管他大水漫金山，
                    <br />
                    正好洗我满头汗，
                    <br />
                    不畏 不馁 不废 不退，
                    <br />
                    迎风 准备 展翅 高飞。
                    <br />
                </p>
            </article>
            <aside className="flex flex-col absolute top-0 right-0 w-[calc(50%-400px)] h-full hover:opacity-100 opacity-90 transition-opacity duration-300">
                <div className="flex items-center p-4 gap-3">
                    <WButton>创建笔记</WButton>
                    <WButton>标签管理</WButton>
                </div>
                <WTimeline></WTimeline>
            </aside>
        </div>
    );
}
