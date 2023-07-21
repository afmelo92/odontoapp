/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Companies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[owner_uid]` on the table `Companies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Companies" DROP CONSTRAINT "Companies_owner_id_fkey";

-- DropIndex
DROP INDEX "Companies_owner_id_key";

-- AlterTable
ALTER TABLE "Companies" DROP COLUMN "owner_id",
ADD COLUMN     "owner_uid" TEXT;

-- CreateTable
CREATE TABLE "ProstheticOrders" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "patient_uid" TEXT NOT NULL,
    "dentist_name" TEXT,
    "dentist_uid" TEXT NOT NULL,
    "lab_uid" TEXT NOT NULL,
    "description" TEXT,
    "service_name" TEXT,
    "service_material" TEXT,
    "service_color" TEXT,
    "service_deadline" DATE NOT NULL,
    "elements" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProstheticOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProstheticOrders_uid_key" ON "ProstheticOrders"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Companies_owner_uid_key" ON "Companies"("owner_uid");

-- AddForeignKey
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_owner_uid_fkey" FOREIGN KEY ("owner_uid") REFERENCES "Users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProstheticOrders" ADD CONSTRAINT "ProstheticOrders_patient_uid_fkey" FOREIGN KEY ("patient_uid") REFERENCES "Patients"("uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProstheticOrders" ADD CONSTRAINT "ProstheticOrders_dentist_uid_fkey" FOREIGN KEY ("dentist_uid") REFERENCES "Users"("uid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProstheticOrders" ADD CONSTRAINT "ProstheticOrders_lab_uid_fkey" FOREIGN KEY ("lab_uid") REFERENCES "Companies"("uid") ON DELETE NO ACTION ON UPDATE CASCADE;
