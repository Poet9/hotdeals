import * as cheerio from "cheerio";
export async function scrapeAEProduct(productUrl: string) {
    if (!productUrl) return null;
    try {
        const response = await fetch(productUrl, {
            method: "GET",
            credentials: "include",
            mode: "cors",
        });
        const data = await response.text();
        const $ = cheerio.load(data);
        const title = $('h1[data-pl="product-title"]').text();
        console.log({ title });
    } catch (err: any) {
        console.log(`Failed to scrape product ${err.message}`);
    }
}
