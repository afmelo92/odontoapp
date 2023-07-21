-- AlterTable
ALTER TABLE "ProstheticOrders" ADD COLUMN     "dentist_clinic" TEXT,
ALTER COLUMN "dentist_uid" DROP NOT NULL;
