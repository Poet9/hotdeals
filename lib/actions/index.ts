"use server";

import { scrapeAEProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return null;
    try {
        const data = await scrapeAEProduct(productUrl);
        console.log({ data });
    } catch (err: any) {
        console.log(`Failed to create/update product ${err.message}`);
    }
}
