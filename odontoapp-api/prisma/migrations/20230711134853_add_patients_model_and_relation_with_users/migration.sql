/*
  Warnings:

  - You are about to drop the column `employee_id` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employee_uid]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_employee_id_fkey";

-- DropIndex
DROP INDEX "Users_employee_id_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "employee_id",
ADD COLUMN     "employee_uid" TEXT;

-- CreateTable
CREATE TABLE "_PatientsToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PatientsToUsers_AB_unique" ON "_PatientsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientsToUsers_B_index" ON "_PatientsToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Users_employee_uid_key" ON "Users"("employee_uid");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_employee_uid_fkey" FOREIGN KEY ("employee_uid") REFERENCES "Companies"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientsToUsers" ADD CONSTRAINT "_PatientsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientsToUsers" ADD CONSTRAINT "_PatientsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
