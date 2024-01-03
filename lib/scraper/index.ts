import * as cheerio from "cheerio";
import axios from "axios";

export async function scrapeAEProduct(productUrl: string) {
    if (!productUrl) return null;
    const options = {
        auth: {
            username: `${String(process.env.BRIGHT_DATA_USERNAME)}-session-${
                (1000000 * Math.random()) | 0
            }`,
            password: String(process.env.BRIGHT_DATA_PASSWORD),
        },
        host: "brd.superproxy.io",
        port: 22225,
        rejectUnauthorized: false,
    };
    try {
        const response = await axios.get(productUrl, options);
        const $ = cheerio.load(response.data);
        const title = $(".magnifier--image--L4hZ4dC").attr();
        console.log({ title });
    } catch (err: any) {
        console.log(`Failed to scrape product ${err.message}`);
    }
}

// title--wrap--Ms9Zv4A
