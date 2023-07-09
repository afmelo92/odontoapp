/*
  Warnings:

  - You are about to drop the column `cpf_cnpj` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "cpf_cnpj",
ADD COLUMN     "birth_date" DATE,
ADD COLUMN     "cpf" TEXT;
