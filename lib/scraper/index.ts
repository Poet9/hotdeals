import { itemClient } from "@/types";
import puppeteer from "puppeteer";

export async function scrapeAEProduct(productUrl: string) {
    if (!productUrl) return null;
    const browser: any = await puppeteer.launch({
        headless: "new",
    });

    const page: any = await browser.newPage();

    try {
        await page.goto(productUrl, { waitUntil: "networkidle2" });
        await page.$eval(
            "#gdpr-new-container",
            (el: HTMLDivElement) => (el.style.display = "none")
        );
        await page.waitForSelector(".ship-to--menuItem--WdBDsYl");
        await page.click(".es--wrap--RYjm1RT > div > div");
        await page.waitForSelector(".es--saveBtn--w8EuBuy");
        await page.click(".es--contentWrap--ypzOXHr.es--visible--12ePDdG > div:nth-child(6)");
        await page.waitForSelector(
            ".select--popup--W2YwXWt.select--visiblePopup--VUtkTX2 > .select--item--32FADYB"
        );
        await page.click(
            ".select--popup--W2YwXWt.select--visiblePopup--VUtkTX2 > .select--item--32FADYB"
        );
        await page.click(".es--saveBtn--w8EuBuy");
        await page.click(".es--saveBtn--w8EuBuy");

        // // helper function
        // const getPrice = (spans: any): string => {
        //     let price: string = "";
        //     for (const span of spans) {
        //         price += span.textContent;
        //     }
        //     return price;
        // };
        // starting the scraping functionality
        await page.reload({ waitUntil: "load" });
        await page.waitForSelector(".pdp-info");
        const productContainer = await page.$(".pdp-info");
        if (!productContainer) throw new Error("the page did not load correctly");
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
        console.log(productData);
    } catch (err: any) {
        console.log(`Failed to scrape product ${err.message}`);
    } finally {
        await browser.close();
    }
}
