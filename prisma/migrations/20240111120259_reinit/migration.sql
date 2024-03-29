/*
  Warnings:

  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "reviewCount" SET DATA TYPE TEXT,
ALTER COLUMN "stars" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");
