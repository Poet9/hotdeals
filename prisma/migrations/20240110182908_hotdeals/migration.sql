-- CreateTable
CREATE TABLE "product" (
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "priceHistory" DOUBLE PRECISION[],
    "discount" TEXT NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "lowestPrice" DOUBLE PRECISION NOT NULL,
    "highestPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("url")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_url_key" ON "product"("url");
