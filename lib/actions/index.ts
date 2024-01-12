"use server";

import { item } from "@/types";
import { revalidatePath } from "next/cache";
import { scrapeAEProduct } from "../scraper";
import { prisma } from "@/prisma/client";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return null;
    try {
        const productData = await scrapeAEProduct(productUrl);
        if (!productData) throw new Error("no data has been returned");
        // adding the missing pieces
        let scrapedProduct: item = {
            ...productData,
            highestPrice: productData.originalPrice > 0 ? productData.originalPrice : productData.currentPrice,
            lowestPrice: productData.currentPrice > 0 ? productData.currentPrice : productData.originalPrice,
            priceHistory: [productData.originalPrice, productData.currentPrice],
        };
        // checking if it is already in db
        const existingProduct = await prisma.product.findFirst({
            where: { url: productData.url },
        });
        if (existingProduct) {
            if (existingProduct.priceHistory.at(-1) !== productData.currentPrice) existingProduct.priceHistory.push(productData.currentPrice);

            scrapedProduct = {
                ...scrapedProduct,
                priceHistory: existingProduct.priceHistory,
                lowestPrice: searchForLowest(existingProduct.priceHistory),
                highestPrice: searchForHighest(existingProduct.priceHistory),
            };
        }
        // this part handles saving a record or updating it
        const newProduct = await prisma.product.upsert({
            where: { url: scrapedProduct.url },
            update: {
                priceHistory: scrapedProduct.priceHistory,
                lowestPrice: scrapedProduct.lowestPrice,
                highestPrice: scrapedProduct.highestPrice,
            },
            create: { ...scrapedProduct },
        });
        revalidatePath(`/products/${newProduct.id}`);
    } catch (err: any) {
        console.log(`Failed to create/update product ${err.message}`);
        return null;
    }
}
const searchForLowest = (array: number[]): number => {
    let lowest: number = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < lowest) lowest = array[i];
    }
    return lowest;
};
const searchForHighest = (array: number[]): number => {
    let highest: number = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > highest) highest = array[i];
    }
    return highest;
};

// get specific product data
export const getProduct = async (id: string) => {
    try {
        const product = await prisma.product.findFirst({ where: { id: id } });
        if (!product) throw new Error("Product not found");
        return product;
    } catch (err: any) {
        console.log(`An error has occured ${err.message}`);
        return null;
    }
};

// get all product in db
export const getAllProducts = async () => {
    try {
        const allProducts = await prisma.product.findMany();
        return allProducts;
    } catch (err: any) {
        console.log(`An error has occured ${err.message}`);
    }
};
