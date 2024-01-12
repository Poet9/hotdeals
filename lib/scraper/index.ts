"use server";
import { itemClient } from "@/types";
import puppeteer from "puppeteer";

export async function scrapeAEProduct(productUrl: string) {
    if (!productUrl) return null;
    const browser: any = await puppeteer.launch({
        headless: "new",
    });

    const page: any = await browser.newPage();
    var productData: itemClient | null = null;
    try {
        await page.goto(productUrl, { waitUntil: "networkidle2", timeout: 60000 });
        // changing currency to be always in euro (or the first suggested currency for that matter)
        if (page.$("#gdpr-new-container")) await page.$eval("#gdpr-new-container", (el: HTMLDivElement) => (el.style.display = "none"));
        await page.waitForSelector(".ship-to--menuItem--WdBDsYl");
        await page.click(".es--wrap--RYjm1RT > div > div");
        await page.waitForSelector(".es--saveBtn--w8EuBuy");
        await page.click(".es--contentWrap--ypzOXHr.es--visible--12ePDdG > div:nth-child(6)");
        await page.waitForSelector(".select--popup--W2YwXWt.select--visiblePopup--VUtkTX2 > .select--item--32FADYB");
        await page.click(".select--popup--W2YwXWt.select--visiblePopup--VUtkTX2 > .select--item--32FADYB");
        await page.click(".es--saveBtn--w8EuBuy");
        await page.click(".es--saveBtn--w8EuBuy");
        // starting the scraping functionality
        await page.reload({ waitUntil: "load" });
        await page.waitForSelector(".pdp-info");
        const productContainer = await page.$(".pdp-info");
        if (!productContainer) throw new Error("the page did not load correctly");
        productData = await page.evaluate(
            (el: Element) => ({
                title: el.querySelector('h1[data-pl="product-title"]')?.textContent || "",
                image:
                    el.querySelector(".magnifier--image--L4hZ4dC")?.getAttribute("src") ||
                    el.querySelector(".video--wrap--NfR8r9l >.video--video--Zj0EIzE")?.getAttribute("poster") ||
                    "",
                url: "",
                currentPrice: -1,
                originalPrice: Number(el.querySelector(".price--originalText--Zsc6sMv")?.textContent?.match(/\d+(.*)/g)) || -1,
                discount: Number(el.querySelector(".price--discount--xET8qnP")?.textContent?.match(/-?\d+(?:\.\d+)?/)) || -1,
                reviewCount: el.querySelector('div[data-pl="product-reviewer"]')?.lastChild?.textContent?.trim() || -1,
                stars: Number(el.querySelector('div[data-pl="product-reviewer"] > strong')?.textContent) || -1,
                inStock: true,
                currency: el.querySelector(".price--originalText--Zsc6sMv")?.textContent?.replace(/\d+(.*)/g, "") || "€",
            }),
            productContainer
        );
        const priceArr = await page.$$eval(".es--wrap--erdmPRe > span", (digits: HTMLSpanElement[]) => digits.map((digit) => digit.textContent));
        if (productData) {
            productData.currentPrice = Number(priceArr.join("").match(/\d+(.*)/g)) || -1;
            productData.url = productUrl || "";
        }
    } catch (err: any) {
        console.log(`Failed to scrape product ${err.message}`);
    } finally {
        await browser.close();
        return productData; // sending data to be saved in the database
    }
}
