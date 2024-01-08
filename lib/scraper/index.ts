import puppeteer from "puppeteer";
export async function scrapeAEProduct(productUrl: string) {
    if (!productUrl) return null;
    const browser: any = await puppeteer.launch({ headless: false });
    try {
        const page: any = await browser.newPage();
        await page.goto(productUrl);
        // Query for an element handle.
        const element = await page.waitForSelector('h1[data-pl="product-title"]');
        const title = await element.evaluate((el: any) => el.textContent);
        console.log({ title });
    } catch (err: any) {
        console.log(`Failed to scrape product ${err.message}`);
    } finally {
        await browser.close();
    }
}
