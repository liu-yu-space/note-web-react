import BookGril from "@/assets/book-gril1.png";

export default function Home() {
    return (
        <main className="overflow-auto">
            <section className=" flex justify-center items-center gap-10 p-10 min-h-[calc(100vh-100px)]">
                <div>其进锐者，其退速。- 孟子</div>
                <img src={BookGril} alt="" className="w-3/12" />
            </section>
        </main>
    );
}
