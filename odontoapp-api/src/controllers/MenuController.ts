import MenuRepository from '@/repositories/MenuRepository';
import { TypedRequestBody } from '@/routes';
import { mapBodyErrorFields } from '@/utils';
import { Role } from '@prisma/client';
import { Request, Response } from 'express';

type CreateMenuBody = {
  title: string;
  href: string;
  icon: string;
  role: Array<Role>;
  sub: Array<CreateMenuBody>;
  order: number;
};

class MenuController {
  public async create(req: TypedRequestBody<CreateMenuBody>, res: Response) {
    const {
      title = '',
      href = '',
      icon = '',
      role = [],
      sub = [],
      order = 99,
    } = req.body;

    if (!title || !href || !icon || !role || !sub || !order) {
      return res.status(400).json({
        message: 'All fields required',
        fields: mapBodyErrorFields(req.body),
      });
    }

    if (!Array.isArray(role)) {
      return res.status(400).json({
        message: 'Role required',
        fields: 'role',
      });
    }

    if (role.length <= 0) {
      return res.status(400).json({
        message: 'Role required',
        fields: 'role',
      });
    }

    let hasPermittedRoles = false;

    role.forEach((item) =>
      item.toUpperCase() === 'ADMIN' ||
      item.toUpperCase() === 'DENTIST' ||
      item.toUpperCase() === 'LAB' ||
      item.toUpperCase() === 'PATIENT'
        ? (hasPermittedRoles = true)
        : null
    );

    if (!hasPermittedRoles) {
      return res.status(400).json({
        message: 'Invalid role(s)',
        fields: 'role',
      });
    }

    if (!Array.isArray(sub)) {
      return res.status(400).json({
        message: 'Invalid submenu value',
        fields: 'sub',
      });
    }

    if (!Number.isInteger(order)) {
      return res.status(400).json({
        message: 'Invalid order value',
        fields: 'order',
      });
    }

    if (order <= 0) {
      return res.status(400).json({
        message: 'Invalid order value',
        fields: 'order',
      });
    }

    const alreadyExists = await MenuRepository.findByFields({
      fields: ['href', 'title'],
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: 'Menu item already exists.',
        fields: ['href', 'title'],
      });
    }

    await MenuRepository.createMenuItem({
      href,
      icon,
      order,
      title,
      role,
      sub,
    });

    return res.status(201).json({ message: 'ok' });
  }

  public async index(req: Request, res: Response) {
    const menu = await MenuRepository.findAll();

    return res.json({ message: 'ok', data: menu });
  }

  public async show(req: Request, res: Response) {
    const { role: req_role } = req.user;

    const menu = await MenuRepository.findByRole({
      role: req_role,
    });

    return res.json({ message: 'ok', data: menu });
  }

  public async delete(req: Request, res: Response) {
    const { menu_id } = req.params;

    await MenuRepository.deleteByUID({
      uid: menu_id,
    });

    return res.json({ message: 'ok' });
  }
}

export default new MenuController();
