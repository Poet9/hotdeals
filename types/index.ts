export type item = {
    title: string;
    image: string;
    url: string;
    currentPrice: number;
    originalPrice: number;
    discount: number;
    reviewCount: string;
    stars: number;
    currency: string;
    inStock: boolean;
    highestPrice: number;
    lowestPrice: number;
    priceHistory: number[];
    trackers: string[] | undefined;
};
export type itemClient = Omit<item, "highestPrice" | "lowestPrice" | "priceHistory">;

export type NotificationType = "WELCOME" | "CHANGE_OF_STOCK" | "LOWEST_PRICE" | "THRESHOLD_MET";

export type EmailContent = {
    subject: string;
    body: string;
};

export type EmailProductInfo = {
    title: string;
    url: string;
};
