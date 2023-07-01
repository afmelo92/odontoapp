import { Prisma } from '@prisma/client';
import prisma from '@/db';

type CreateUserProps = {
  data: Prisma.UsersCreateInput;
  select?: Prisma.UsersSelect;
};

type FindByEmailProps = {
  email: Required<string>;
  select?: Prisma.UsersSelect;
};

export const safeUserSelectSet: Prisma.UsersSelect = {
  uid: true,
  name: true,
  email: true,
  active: true,
  address: true,
  company: true,
  cpf_cnpj: true,
  cro: true,
  phone: true,
  cellphone: true,
};

class UsersRepository {
  async createUser({ data, select = safeUserSelectSet }: CreateUserProps) {
    const user = await prisma.users.create({
      data,
      select,
    });

    return user;
  }

  async findByEmail({ email, select = safeUserSelectSet }: FindByEmailProps) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      select,
    });

    return user;
  }
}

export default new UsersRepository();
