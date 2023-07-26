import prisma from '@/db';
import { Menu, Prisma, Role } from '@prisma/client';

type FindByRoleProps = {
  role: Role;
};

type FindByFieldsProps = {
  fields: Array<
    keyof Omit<Menu, 'createdAt' | 'updatedAt' | 'id' | 'uid' | 'sub' | 'role'>
  >;
};

type CreateMenuItemProps = Prisma.MenuCreateInput;

type DeleteByUIDProps = {
  uid: string;
};

class MenuRepository {
  public async findByRole({ role }: FindByRoleProps) {
    const dynamicWhere =
      role === 'ADMIN'
        ? {}
        : {
            role: {
              has: role,
            },
          };

    const menu = await prisma.menu.findMany({
      select: {
        uid: true,
        title: true,
        href: true,
        icon: true,
        sub: true,
      },
      orderBy: {
        order: 'asc',
      },
      where: dynamicWhere,
    });

    return menu;
  }

  public async findAll() {
    const menu = await prisma.menu.findMany({
      select: {
        uid: true,
        title: true,
        href: true,
        icon: true,
        sub: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return menu;
  }

  public async findByFields({ fields }: FindByFieldsProps) {
    const dynamicWhere = fields.map((field) => ({
      [`${field}`]: {
        equals: field,
      },
    }));

    const menu = await prisma.menu.findFirst({
      where: {
        OR: dynamicWhere,
      },
    });

    return menu;
  }

  public async createMenuItem({
    href = '',
    icon = '',
    order = 99,
    role,
    sub = [],
    title = '',
  }: CreateMenuItemProps) {
    const menu = await prisma.menu.create({
      data: {
        title,
        href,
        icon,
        role,
        sub,
        order,
      },
    });

    return menu;
  }

  public async deleteByUID({ uid }: DeleteByUIDProps) {
    const menu = await prisma.menu.delete({
      where: {
        uid,
      },
    });

    return menu;
  }
}

export default new MenuRepository();
