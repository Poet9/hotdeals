import { itemClient } from "@/types";
import puppeteer from "puppeteer";

export async function scrapeAEProduct(productUrl: string) {
    if (!productUrl) return null;
    const browser: any = await puppeteer.launch({ headless: "new" });
    const page: any = await browser.newPage();
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    );
    try {
        await page.goto(productUrl, { waitUntil: "domcontentloaded" });
        // helper function
        const getPrice = (spans: any): string => {
            let price: string = "";
            for (const span of spans) {
                price += span.textContent;
            }
            return price;
        };
        // starting the scraping functionality
        const productContainer = await page.$(".pdp-info");
        const productData: itemClient = await page.evaluate(
            (el: Element) => ({
                title: el.querySelector('h1[data-pl="product-title"]')?.textContent,
                image: el.querySelector(".magnifier--image--L4hZ4dC")?.getAttribute("src") || "",
                url: "",
                currentPrice: "0.0000",
                originalPrice:
                    el.querySelector(".price--originalText--Zsc6sMv")?.textContent || "000.00",
                discount: el.querySelector(".price--discount--xET8qnP")?.textContent || "",
                reviewCount:
                    el
                        .querySelector('div[data-pl="product-reviewer"]')
                        ?.lastChild?.textContent?.trim() || "000",
                stars:
                    el
                        .querySelector('div[data-pl="product-reviewer"] > strong')
                        ?.textContent?.trim() || "0000",
                inStock: true,
            }),
            productContainer
        );
        const priceArr = await page.$$eval(
            ".es--wrap--erdmPRe > span",
            (digits: HTMLSpanElement[]) => digits.map((digit) => digit.textContent)
        );
        productData.currentPrice = priceArr.join("");
        productData.url = productUrl;
        // I have to send the data to be saved in the database
    } catch (err: any) {
        console.log(`Failed to scrape product ${err.message}`);
    } finally {
        await browser.close();
    }
}
