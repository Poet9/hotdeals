"use server";
import { item } from "@/types";
import { revalidatePath } from "next/cache";
import { scrapeAEProduct } from "@/lib/scraper";
import { prisma } from "@/prisma/client";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { searchForHighest, searchForLowest } from "@/lib/utils";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return null;
    try {
        const productData = await scrapeAEProduct(productUrl);
        if (!productData) throw new Error("no data has been returned");
        // adding the missing pieces
        let scrapedProduct: item = {
            ...productData,
            currentPrice: productData.currentPrice > 0 ? productData.currentPrice : productData.originalPrice,
            originalPrice: productData.originalPrice > 0 ? productData.originalPrice : productData.currentPrice,
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

// adding email to tracking list
export const addEmail = async (productId: string, userEmail: string) => {
    try {
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new Error("product not found.");
        const emailExist = product.trackers.find((email: string) => email === userEmail);
        if (emailExist) throw new Error("email already subscribed");
        product.trackers.push(userEmail);
        await prisma.product.update({ where: { id: product.id }, data: { trackers: [...product.trackers] } });

        const emailContent = await generateEmailBody({ title: product.title, url: product.url }, "WELCOME");
        await sendEmail(emailContent, [userEmail]);
        console.log("successful!!");
    } catch (err: any) {
        console.log(`Error while adding email ${err.message}`);
    }
};
