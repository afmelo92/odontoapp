-- AlterTable
ALTER TABLE "ProstheticOrders" ADD COLUMN     "master_uid" TEXT,
ADD COLUMN     "sequence" INTEGER;

-- AddForeignKey
ALTER TABLE "ProstheticOrders" ADD CONSTRAINT "ProstheticOrders_master_uid_fkey" FOREIGN KEY ("master_uid") REFERENCES "ProstheticOrders"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
