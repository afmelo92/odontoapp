-- AlterTable
ALTER TABLE "ProstheticOrders" ADD COLUMN     "delivered_at" DATE,
ALTER COLUMN "patient_uid" DROP NOT NULL;
