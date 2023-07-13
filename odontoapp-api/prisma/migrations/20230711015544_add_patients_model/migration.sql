-- CreateTable
CREATE TABLE "Patients" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "cellphone" TEXT,
    "cpf" TEXT NOT NULL,
    "address" TEXT,
    "birth" DATE,
    "sex" BOOLEAN,
    "role" "Role" NOT NULL DEFAULT 'PATIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patients_uid_key" ON "Patients"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Patients_email_key" ON "Patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patients_cpf_key" ON "Patients"("cpf");
