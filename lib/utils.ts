import { item, itemClient, NotificationType } from "@/types";

export const searchForLowest = (array: number[]): number => {
  let lowest: number = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < lowest) lowest = array[i];
  }
  return lowest;
};
export const searchForHighest = (array: number[]): number => {
  let highest: number = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > highest) highest = array[i];
  }
  return highest;
};

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

const THRESHOLD_PERCENTAGE = 40;

export const getEmailNotifType = (
  scrapedProduct: itemClient,
  currentProduct: item
): NotificationType | null => {
  const lowestPrice = searchForLowest(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (scrapedProduct.inStock && currentProduct.inStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discount >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }

  return null;
};
