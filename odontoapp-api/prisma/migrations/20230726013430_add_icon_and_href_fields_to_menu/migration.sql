/*
  Warnings:

  - You are about to drop the column `path` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `href` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "path",
ADD COLUMN     "href" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL;
