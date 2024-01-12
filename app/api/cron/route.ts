import {
  getEmailNotifType,
  searchForHighest,
  searchForLowest,
} from "@/lib/utils";
import { prisma } from "@/prisma/client";
import { scrapeAEProduct } from "@/lib/scraper";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { NextResponse } from "next/server";
import { item } from "@/types";

export const maxDuration = 300;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const allProducts = await prisma.product.findMany();
    if (!allProducts) return NextResponse.json({ message: "no product found" });
    // go through all the products in db
    const updatedProducts = await Promise.all(
      allProducts.map(
        async (product: { id: string; trackers: string[] } & item) => {
          // scrape each product
          const scrapedProduct = await scrapeAEProduct(product.url);
          if (!scrapedProduct) {
            // product out of stock
            return await prisma.product.update({
              where: { id: product.id },
              data: { inStock: false },
            });
          }
          // checking if its stil under the same price
          if (product.priceHistory.at(-1) === scrapedProduct.currentPrice)
            return;

          // update products price
          const updatedPriceHistory = [
            ...product.priceHistory,
            scrapedProduct.currentPrice,
          ];
          product = {
            ...scrapedProduct,
            id: product.id,
            trackers: product.trackers,
            priceHistory: updatedPriceHistory,
            highestPrice: searchForHighest(updatedPriceHistory),
            lowestPrice: searchForHighest(updatedPriceHistory),
          };
          // updating the product in the db
          const updatedProduct = await prisma.product.update({
            where: { id: product.id },
            data: { ...product },
          });
          // getting email notification type
          const emailNotificationType = getEmailNotifType(
            scrapedProduct,
            updatedProduct
          );
          // checking if a notification creteria has been met and there are trackers
          if (emailNotificationType || updatedProduct.trackers.length > 0) {
            const emailContent = await generateEmailBody(
              { url: updatedProduct.url, title: updatedProduct.title },
              emailNotificationType
            );
            if (emailContent)
              await sendEmail(emailContent, updatedProduct.trackers);
          }
        }
      )
    );
    return NextResponse.json({
      message: "ok",
      updatedProducts: updatedProducts.length,
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
