import prisma from '@/db';
import { Prisma } from '@prisma/client';

type FindFirstEmailProps = {
  primaryEmail: Required<string>;
  secondaryEmail: Required<string>;
  select?: Prisma.CompaniesSelect;
};

type FincCompanyByCNPJProps = {
  cnpj: Required<string>;
  select?: Prisma.CompaniesSelect;
};

const safeCompanySelectSet: Prisma.CompaniesSelect = {
  address: true,
  cellphone: true,
  cnpj: true,
  name: true,
  phone: true,
  primary_email: true,
  secondary_email: true,
  uid: true,
  website: true,
};

class CompaniesRepository {
  public async findCompanyByCNPJ({
    cnpj,
    select = safeCompanySelectSet,
  }: FincCompanyByCNPJProps) {
    const company = await prisma.companies.findUnique({
      where: {
        cnpj,
      },
      select,
    });

    return company;
  }

  public async findFirstEmail({
    primaryEmail,
    secondaryEmail,
    select = safeCompanySelectSet,
  }: FindFirstEmailProps) {
    const company = await prisma.companies.findFirst({
      where: {
        OR: [
          { primary_email: primaryEmail },
          { secondary_email: secondaryEmail },
        ],
      },
      select,
    });

    return company;
  }
}

export default new CompaniesRepository();
