import Card from "@/components/card";
import CarouselEl from "@/components/carousel";
import Search from "@/components/search";
import { getAllProducts } from "@/lib/actions";
import { item } from "@/types";
export default async function Home() {
    const allProducts = await getAllProducts();
    return (
        <main className="flex min-h-screen py-10 flex-col items-center justify-between">
            <section className="xl:flex p-16">
                <div className="">
                    <h2 className="text-6xl">
                        Buy what you need at the <span className="text-[#c59f]">right time with the right price</span>
                    </h2>
                    <Search />
                </div>
                <CarouselEl />
            </section>
            <section className="w-full grid place-items-center py-8 gap-4 grid-cols-1 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
                {Array.isArray(allProducts) ? (
                    allProducts?.map((product: item & { id: string }) => <Card key={product.id} product={product} />)
                ) : (
                    <h3> No items to show</h3>
                )}
            </section>
        </main>
    );
}
