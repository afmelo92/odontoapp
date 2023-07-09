/*
  Warnings:

  - You are about to drop the column `birth_date` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "birth_date",
ADD COLUMN     "birth" DATE,
ADD COLUMN     "post" TEXT;
