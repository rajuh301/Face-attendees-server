/*
  Warnings:

  - You are about to drop the column `createdAt` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `paymentAmount` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `paymentStatus` on the `invoices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "createdAt",
DROP COLUMN "customerPhone",
DROP COLUMN "updatedAt",
ADD COLUMN     "paymentAmount" INTEGER NOT NULL,
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" TEXT NOT NULL,
ALTER COLUMN "dueAmount" DROP DEFAULT;
