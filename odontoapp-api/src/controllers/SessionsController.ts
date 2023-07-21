import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '@/etc/config';
import { validateEmail } from '@/utils/validators';
import UsersRepository from '@/repositories/UsersRepository';
import { newServices, colorScale } from '@/etc/constants';
class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email/Password required.',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid e-mail.',
      });
    }

    const user = await UsersRepository.findByEmail({
      email,
      select: {
        address: true,
        birth: true,
        cellphone: true,
        cpf: true,
        cro: true,
        email: true,
        uid: true,
        post: true,
        name: true,
        phone: true,
        password: true,
        role: true,
        company: {
          select: {
            address: true,
            primary_email: true,
            secondary_email: true,
            cellphone: true,
            cnpj: true,
            name: true,
            phone: true,
            website: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        message: 'Email/Password does not match.',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const passwordMatched = await bcrypt.compare(password, user.password!);

    if (!passwordMatched) {
      return res.status(400).json({
        message: 'Email/Password does not match.',
      });
    }

    const { expiresIn, secret } = config.jwt;

    const token = jwt.sign({}, secret, {
      expiresIn,
      subject: user.uid,
    });

    const result = {
      id: user.uid,
      email: user.email,
      name: user.name,
      cro: user.cro,
      cpf: user.cpf,
      cellphone: user.cellphone,
      phone: user.phone,
      company: user.company,
      address: user.address,
      role: user.role,
      birth: user.birth,
      post: user.post,
      services: newServices,
      colorScale,
    };

    return res.json({
      message: 'ok',
      data: {
        user: result,
        token,
      },
    });
  }
}

export default new SessionsController();
