import UsersRepository from '@/repositories/UsersRepository';
import { TypedRequestBody } from '@/routes';
import { valida_cpf_cnpj, validateEmail } from '@/utils/validators';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import config from '@/etc/config';
import { setAccountType } from '@/utils';

type CreateUserBody = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  cpf_cnpj: string;
  account_type: 1 | 2;
};

class UsersController {
  async create(req: TypedRequestBody<CreateUserBody>, res: Response) {
    const {
      name = '',
      email = '',
      cpf_cnpj = '',
      password = '',
      confirm_password = '',
      account_type,
    } = req.body;

    if (
      !name ||
      !email ||
      !cpf_cnpj ||
      !password ||
      !confirm_password ||
      !account_type
    ) {
      return res.status(400).json({
        message: 'All fields required.',
        fields: [
          ...Object.entries(req.body)
            .map(([key, value]) => (Boolean(value) === false ? key : null))
            .filter(Boolean),
        ],
      });
    }

    if (password != confirm_password) {
      return res.status(400).json({
        message: 'Password/Confirm password must match.',
        fields: ['password', 'confirm_password'],
      });
    }

    if (account_type < 1 || account_type > 2) {
      return res.status(400).json({
        message: 'Invalid account type.',
        fields: ['account_type'],
      });
    }

    if (!valida_cpf_cnpj(cpf_cnpj)) {
      return res.status(400).json({
        message: 'Invalid CPF/CNPJ.',
        fields: ['cpf_cnpj'],
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid e-mail.',
        fields: ['email'],
      });
    }
    const sanitizedCPFCNPJ = cpf_cnpj.replace(/[^0-9]/g, '');

    const checkCPFCNPJisAlreadyUsed = await UsersRepository.findByCPFCNPJ({
      cpf_cnpj: sanitizedCPFCNPJ,
    });

    if (checkCPFCNPJisAlreadyUsed) {
      return res.status(400).json({
        message: 'CPF/CNPJ already used.',
        fields: ['cpf_cnpj'],
      });
    }

    const checkEmailAlreadyUsed = await UsersRepository.findByEmail({ email });

    if (checkEmailAlreadyUsed) {
      return res.status(400).json({
        message: 'E-mail already used.',
        fields: ['email'],
      });
    }

    const userRole = setAccountType(account_type);

    const hashedPassword = await bcrypt.hash(password, config.hash.salt);

    const newUser = await UsersRepository.createUser({
      data: {
        name,
        email,
        password: hashedPassword,
        cpf_cnpj: sanitizedCPFCNPJ,
        role: userRole,
      },
    });

    return res.status(201).json({
      message: 'ok',
      data: {
        ...newUser,
      },
    });
  }
}

export default new UsersController();
