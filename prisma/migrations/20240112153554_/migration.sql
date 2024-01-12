/*
  Warnings:

  - The `discount` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "trackers" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "discount",
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "inStock" SET DEFAULT true;
