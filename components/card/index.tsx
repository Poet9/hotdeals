/* eslint-disable @next/next/no-img-element */
import { item } from "@/types";
import Link from "next/link";

const Card = ({ product, ...props }: { product: item & { id: string } }) => {
    return (
        <Link
            href={`/products/${product.id}`}
            data-id={product.id}
            className="flex flex-col w-64 shadow-2xl shadow-indigo-700/50 bg-zinc-200/25 cursor-pointer rounded-md border-2 border-zinc-200/25"
        >
            <img src={product.image} alt={"product image"} width={256} height={256} className="object-cover rounded-t-lg w-64 h-48" />
            <h2 className="h-8 p-2 w-52  truncate text-lg">{product.title.toUpperCase()}</h2>
            <span className=" w-fit  ml-auto mx-4 p-1 rounded-xl border-1 bg-stone-500/25">
                {product.currentPrice} <strong>{product.currency}</strong>
            </span>
        </Link>
    );
};

export default Card;
