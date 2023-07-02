import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '@/etc/config';
import { validateEmail } from '@/utils/validators';
import UsersRepository, {
  safeUserSelectSet,
} from '@/repositories/UsersRepository';

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
        ...safeUserSelectSet,
        password: true,
        role: true,
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
      cpf_cnpj: user.cpf_cnpj,
      cellphone: user.cellphone,
      phone: user.phone,
      company: user.company,
      address: user.address,
      role: user.role,
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
