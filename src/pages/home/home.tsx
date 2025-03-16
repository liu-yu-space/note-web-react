import logo from "@/assets/open-book.svg";
import WButton from "@/components/wbutton";
import BookGril from "@/assets/book-gril1.png";

export default function Home() {
    return (
        <main className="overflow-auto">
            <header className="flex items-center justify-between py-2 px-10">
                <h3 className="flex items-center gap-2">
                    <img src={logo} alt="" className="w-10" />
                    <b>LiuYu`s Note</b>
                </h3>
                <nav className="flex gap-4">
                    <WButton text="首页"></WButton>
                    <WButton text="笔记"></WButton>
                    <WButton text="demo"></WButton>
                    <WButton text="关于作者"></WButton>
                </nav>
            </header>
            <section className=" flex justify-center items-center gap-10 p-10 min-h-[calc(100vh-100px)]">
                <div>其进锐者，其退速。- 孟子</div>
                <img src={BookGril} alt="" className="w-3/12" />
            </section>
        </main>
    );
}
