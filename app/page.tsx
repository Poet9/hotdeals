import CarouselEl from "@/components/carousel";
import Search from "@/components/search";

export default function Home() {
    return (
        <main className="flex min-h-screen py-10 flex-col items-center justify-between">
            <section className="xl:flex p-16">
                <div className="">
                    <h2 className="text-6xl">
                        Buy what you need at the{" "}
                        <span className="text-[#c59f]">right time with the right price</span>
                    </h2>
                    <Search />
                </div>
                <CarouselEl />
            </section>
        </main>
    );
}
