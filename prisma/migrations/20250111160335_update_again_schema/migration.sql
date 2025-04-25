/*
  Warnings:

  - You are about to drop the column `customerEmail` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "customerEmail",
ADD COLUMN     "customerAddress" TEXT,
ADD COLUMN     "customerPhone" TEXT;
