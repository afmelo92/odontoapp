import { Companies, Prisma, Users } from '@prisma/client';
import prisma from '@/db';

type FindALlProps = {
  take?: number;
  skip?: number;
  select?: Prisma.UsersSelect;
};

type CreateUserProps = {
  data: Prisma.UsersCreateInput;
  select?: Prisma.UsersSelect;
};

type FindByUIDProps = {
  uid: Required<string>;
  select?: Prisma.UsersSelect;
};

type DeleteByUIDProps = FindByUIDProps;

type FindByEmailProps = {
  email: Required<string>;
  select?: Prisma.UsersSelect;
};

type FindByCPFProps = {
  cpf: Required<string>;
  select?: Prisma.UsersSelect;
};

type UpdateUserProps = {
  uid: Required<string>;
  userData: Partial<Users>;
  companyData: Partial<Companies>;
  select?: Prisma.UsersSelect;
};

export const safeUserSelectSet: Prisma.UsersSelect = {
  uid: true,
  name: true,
  email: true,
  active: true,
  address: true,
  company: {
    select: {
      uid: true,
      primary_email: true,
      secondary_email: true,
      name: true,
      cnpj: true,
      cellphone: true,
      phone: true,
      address: true,
      website: true,
      active: true,
    },
  },
  cpf: true,
  cro: true,
  phone: true,
  cellphone: true,
  birth: true,
  post: true,
};

class UsersRepository {
  public async createUser({
    data,
    select = safeUserSelectSet,
  }: CreateUserProps) {
    const user = await prisma.users.create({
      data,
      select,
    });

    return user;
  }

  async findAll({ take, skip, select = safeUserSelectSet }: FindALlProps) {
    const users = await prisma.users.findMany({
      take,
      skip,
      select,
    });

    return users;
  }

  public async findByEmail({
    email,
    select = safeUserSelectSet,
  }: FindByEmailProps) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      select,
    });

    return user;
  }

  public async findByCPF({ cpf, select = safeUserSelectSet }: FindByCPFProps) {
    const user = await prisma.users.findFirst({
      where: {
        cpf,
      },
      select,
    });

    return user;
  }

  async findByUID({ uid, select = safeUserSelectSet }: FindByUIDProps) {
    const user = await prisma.users.findUnique({
      where: {
        uid,
      },
      select,
    });

    return user;
  }

  public async inactivateUserByUID({ uid }: { uid: string }) {
    const user = await prisma.users.update({
      data: {
        active: false,
      },
      where: {
        uid,
      },
    });

    return user;
  }

  public async deleteByUID({
    uid,
    select = safeUserSelectSet,
  }: DeleteByUIDProps) {
    const user = await prisma.users.delete({
      where: {
        uid: uid,
      },
      select,
    });

    return user;
  }

  public async updateUserByUID({
    uid,
    userData,
    companyData,
    select = safeUserSelectSet,
  }: UpdateUserProps) {
    const user = await prisma.users.update({
      where: {
        uid,
      },
      data: {
        ...userData,
        company: {
          upsert: {
            create: {
              ...companyData,
            },
            update: {
              ...companyData,
            },
          },
        },
      },
      select,
    });

    return user;
  }
}

export default new UsersRepository();
