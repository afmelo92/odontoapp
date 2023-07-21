/*
  Warnings:

  - Added the required column `status` to the `ProstheticOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProstheticOrders" ADD COLUMN     "status" INTEGER NOT NULL;
