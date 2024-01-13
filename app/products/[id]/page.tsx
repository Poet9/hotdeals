/* eslint-disable @next/next/no-img-element */
import Button from "@/components/tracker";
import PriceHistory from "@/components/priceHistory";
import { getProduct } from "@/lib/actions";
import { StarIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";

type Props = {
    params: { id: string };
};
const page = async ({ params }: Props) => {
    // getting product data
    const product = await getProduct(params.id);
    if (!product) return redirect("/pagenotfound");
    // rendering stars icon
    const renderStars = () => {
        for (let i = 0; i < product.stars; i++) {}
    };
    return (
        <div className="min-h-screen w-screen grid grid-cols-1 lg:grid-cols-2 gap-4 pb-10 items-center overflow-x-hidden">
            <img src={product.image} alt="product picture" className="" />
            <div className="flex flex-col justify-evenly">
                <h2 className="text-2xl my-5">{product.title}</h2>
                <div className="flex  my-4 p-2">
                    <h3 className={`border-2 py-2 px-4 rounded ${product.inStock ? "bg-green-400/25" : "bg-slate-500/50"}`}>in stock</h3>
                    <div className="flex">
                        {Array.from({ length: 5 }, (_, i) =>
                            i <= product.stars ? (
                                <StarIcon key={`star-${i}`} className="w-5 h-5 text-yellow-600" />
                            ) : (
                                <StarIcon key={`star-${i}`} className="w-5 h-5 text-slate-600" />
                            )
                        )}
                        <strong className="mr-5">{product.stars}</strong>
                        <p className="">{product.reviewCount}</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <h3 className="p-2 bg-red-500/80 text-white"> {product.discount}%</h3>
                    <p className="text-[34px] text-secondary font-bold">
                        {product.currency} {product.currentPrice}
                    </p>
                    <p className="text-[21px] text-slate-400/50 line-through">
                        {product.currency} {product.originalPrice}
                    </p>
                </div>
                <div className="grid grid-cols-2 p-2 gap-5">
                    <PriceHistory title=" current price : " currency={product.currency} value={product.currentPrice} />
                    <PriceHistory title=" original price : " currency={product.currency} value={product.originalPrice} />
                    <PriceHistory title=" lowest price : " currency={product.currency} value={product.lowestPrice} />
                    <PriceHistory title=" highest price : " currency={product.currency} value={product.highestPrice} />
                </div>
                <div>
                    <div className="flex justify-end m-2 gap-4 px-5">
                        <a href={product.url} target="_blank" className="py-2 px-4 text-white text-xl rounded-lg bg-green-800/80 hover:bg-green-800">
                            Visit
                        </a>
                        <Button
                            id="item-tracker"
                            productId={product.id}
                            className="py-2 px-4 text-white text-xl rounded-lg bg-cyan-950 hover:bg-cyan-900"
                        >
                            Track
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
