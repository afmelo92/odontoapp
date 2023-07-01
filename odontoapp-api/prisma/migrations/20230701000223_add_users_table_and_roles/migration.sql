-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DENTIST', 'PATIENT', 'LAB', 'ADMIN');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cro" TEXT,
    "cellphone" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "cpf_cnpj" TEXT NOT NULL,
    "address" TEXT,
    "password" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "role" "Role" NOT NULL DEFAULT 'DENTIST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_uid_key" ON "Users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
