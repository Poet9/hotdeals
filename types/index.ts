export type item = {
    title: string;
    image: string;
    url: string;
    currentPrice: number;
    originalPrice: number;
    discount: string;
    reviewCount: string;
    stars: number;
    currency: string;
    inStock: boolean;
    highestPrice: number;
    lowestPrice: number;
    priceHistory: number[];
};
export type itemClient = Omit<item, "highestPrice" | "lowestPrice" | "priceHistory">;
