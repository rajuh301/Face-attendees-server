/*
  Warnings:

  - Added the required column `address` to the `employes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employes" ADD COLUMN     "address" TEXT NOT NULL;
