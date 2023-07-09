/*
  Warnings:

  - You are about to drop the column `company` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employee_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "company",
ADD COLUMN     "employee_id" INTEGER;

-- CreateTable
CREATE TABLE "Companies" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "primary_email" TEXT NOT NULL,
    "secondary_email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT,
    "cellphone" TEXT,
    "phone" TEXT,
    "owner_id" INTEGER NOT NULL,
    "address" TEXT,
    "active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Companies_uid_key" ON "Companies"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_primary_email_key" ON "Companies"("primary_email");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_secondary_email_key" ON "Companies"("secondary_email");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_owner_id_key" ON "Companies"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_employee_id_key" ON "Users"("employee_id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
