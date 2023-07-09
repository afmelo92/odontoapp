-- DropForeignKey
ALTER TABLE "Companies" DROP CONSTRAINT "Companies_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
