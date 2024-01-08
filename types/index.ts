export type item = {
    title: string;
    image: string;
    currentPrice: number | string;
    originalPrice: number | string;
    url: string;
    currency: string;
    priceHistory: number[];
    discount: string;
    reviewCount: number | string;
    stars: number | string;
    inStock: boolean;
    lowestPrice: number;
    highestPrice: number;
};
export type itemClient = Omit<item, "highestPrice" | "lowestPrice" | "priceHistory" | "currency">;
