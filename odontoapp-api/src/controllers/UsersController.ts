import { Response, Request } from 'express';
import { TypedRequestBody, TypedRequestParams } from '@/routes';
import UsersRepository from '@/repositories/UsersRepository';
import CompaniesRepository from '@/repositories/CompaniesRepository';
import {
  valida_cnpj,
  valida_cpf,
  validateEmail,
  validatePhone,
  validateUUID,
} from '@/utils/validators';
import bcrypt from 'bcrypt';
import config from '@/etc/config';
import { mapBodyErrorFields, setAccountType } from '@/utils';
import { Users } from '@prisma/client';

type CreateUserBody = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  cpf: string;
  account_type: 1 | 2;
};

class UsersController {
  public async create(req: TypedRequestBody<CreateUserBody>, res: Response) {
    const {
      name = '',
      email = '',
      cpf = '',
      password = '',
      confirm_password = '',
      account_type,
    } = req.body;

    if (
      !name ||
      !email ||
      !cpf ||
      !password ||
      !confirm_password ||
      !account_type
    ) {
      return res.status(400).json({
        message: 'All fields required.',
        fields: mapBodyErrorFields(req.body),
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

    if (!valida_cpf(cpf)) {
      return res.status(400).json({
        message: 'Invalid CPF/CNPJ.',
        fields: ['cpf'],
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid e-mail.',
        fields: ['email'],
      });
    }

    const sanitizedCPF = cpf.replace(/[^0-9]/g, '');

    const checkCPFisAlreadyUsed = await UsersRepository.findByCPF({
      cpf: sanitizedCPF,
    });

    if (checkCPFisAlreadyUsed) {
      return res.status(400).json({
        message: 'CPF/CNPJ already used.',
        fields: ['cpf'],
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
        cpf: sanitizedCPF,
        role: userRole,
        company: {
          create: {},
        },
      },
    });

    return res.status(201).json({
      message: 'ok',
      data: {
        ...newUser,
      },
    });
  }

  public async index(req: Request, res: Response) {
    const users = await UsersRepository.findAll({});

    return res.json({
      message: 'ok',
      data: users,
    });
  }

  public async show(req: TypedRequestParams<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!validateUUID(id)) {
      return res.status(400).json({
        message: 'Invalid id.',
      });
    }

    const user = await UsersRepository.findByUID({
      uid: id,
    });

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    return res.json({
      message: 'ok',
      data: user,
    });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!validateUUID(id)) {
      return res.status(400).json({
        message: 'Invalid id.',
      });
    }

    await UsersRepository.inactivateUserByUID({ uid: id });

    return res.json({
      message: 'ok',
    });
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      email: req_email,
      role: req_role,
      company: {
        primary_email: req_primary_email,
        secondary_email: req_secondary_email,
        cnpj: req_cnpj,
      },
    } = req.user;
    const {
      admin,
      user_name,
      user_address,
      user_birth,
      user_email,
      user_confirm_email,
      user_password,
      user_confirm_password,
      user_cpf,
      user_cro,
      user_post,
      company_name,
      company_primary_email,
      company_secondary_email,
      company_cnpj,
      company_phone,
      company_cellphone,
      company_address,
      company_website,
    } = req.body;

    if (!validateUUID(id)) {
      return res.status(400).json({
        message: 'Invalid id.',
      });
    }

    const updatedUser = new Map();
    // UPDATE USER DATAFLOW
    if (user_password) {
      if (user_password != user_confirm_password) {
        return res.status(400).json({
          message: 'Password/Confirm password must match.',
          fields: ['user_password', 'user_confirm_password'],
        });
      }

      const hashedPassword = await bcrypt.hash(user_password, config.hash.salt);

      updatedUser.set('password', hashedPassword);
    }

    // Asseguro que todas as validações abaixo serão com emails diferentes do usuario requisitante
    if (
      user_email &&
      user_email !== req_email &&
      user_email !== req_primary_email &&
      user_email !== req_secondary_email
    ) {
      if (user_email != user_confirm_email) {
        return res.status(400).json({
          message: 'E-mail/Confirm e-mail must match.',
          fields: ['user_email', 'user_confirm_email'],
        });
      }

      if (!validateEmail(user_email)) {
        return res.status(400).json({
          message: 'Invalid user e-mail.',
          fields: ['user_email'],
        });
      }

      const checkEmailAlreadyUsedInUsers = await UsersRepository.findByEmail({
        email: user_email,
      });

      // Verifica se o email enviado é diferente do email do requisitante
      if (
        checkEmailAlreadyUsedInUsers &&
        checkEmailAlreadyUsedInUsers.email !== req_email
        // procurar e comparar com emails de empresas
      ) {
        return res.status(400).json({
          message: 'User e-mail already used.',
          fields: ['user_email'],
        });
      }

      updatedUser.set('email', user_email);
    }

    // Only admins can change this field
    if (user_cpf && req_role === 'ADMIN') {
      if (!valida_cpf(user_cpf)) {
        return res.status(400).json({
          message: 'Invalid CPF.',
          fields: ['user_cpf'],
        });
      }

      const checkCPFAlreadyUsed = await UsersRepository.findByCPF({
        cpf: user_cpf,
      });

      if (checkCPFAlreadyUsed) {
        return res.status(400).json({
          message: 'CPF already used.',
          fields: ['user_cpf'],
        });
      }

      updatedUser.set('cpf', user_cpf);
    }

    if (user_name) {
      updatedUser.set('name', user_name);
    }

    if (user_address) {
      updatedUser.set('address', user_address);
    }

    if (user_cro) {
      updatedUser.set('cro', user_cro);
    }

    if (user_birth) {
      updatedUser.set('birth', user_birth);
    }

    if (user_post) {
      updatedUser.set('post', user_post);
    }

    if (typeof admin === 'boolean' && req_role === 'ADMIN') {
      // Apenas admins podem alterar essa propriedade
      updatedUser.set('role', 'ADMIN');
    }

    const updatedCompany = new Map();
    // UPDATE COMPANY DATAFLOW
    if (
      company_primary_email &&
      company_primary_email !== req_primary_email &&
      company_primary_email !== req_secondary_email
    ) {
      if (!validateEmail(company_primary_email)) {
        return res.status(400).json({
          message: 'Invalid primary e-mail.',
          fields: ['company_primary_email'],
        });
      }

      const checkEmailAlreadyUsed = await CompaniesRepository.findFirstEmail({
        primaryEmail: company_primary_email,
        secondaryEmail: company_secondary_email,
      });

      // Verifica se o email enviado é diferente do email do requisitante
      if (checkEmailAlreadyUsed) {
        return res.status(400).json({
          message: 'Primary e-mail already used.',
          fields: ['company_primary_email'],
        });
      }

      updatedCompany.set('primary_email', company_primary_email);
    }

    if (
      company_secondary_email &&
      company_secondary_email !== req_primary_email &&
      company_secondary_email !== req_secondary_email
    ) {
      if (!validateEmail(company_secondary_email)) {
        return res.status(400).json({
          message: 'Invalid secondary e-mail.',
          fields: ['company_secondary_email'],
        });
      }

      const checkEmailAlreadyUsed = await CompaniesRepository.findFirstEmail({
        primaryEmail: company_primary_email,
        secondaryEmail: company_secondary_email,
      });

      // Verifica se o email enviado é diferente do email do requisitante
      if (checkEmailAlreadyUsed) {
        return res.status(400).json({
          message: 'Secondary e-mail already used.',
          fields: ['company_secondary_email'],
        });
      }

      updatedCompany.set('secondary_email', company_secondary_email);
    }

    if (company_cnpj) {
      if (!valida_cnpj(company_cnpj)) {
        return res.status(400).json({
          message: 'Invalid CNPJ.',
          fields: ['company_cnpj'],
        });
      }

      const sanitizedCNPJ = company_cnpj.replace(/[^0-9]/g, '');

      const checkCNPJAlreadyUsed = await CompaniesRepository.findCompanyByCNPJ({
        cnpj: sanitizedCNPJ,
      });

      if (checkCNPJAlreadyUsed && checkCNPJAlreadyUsed.cnpj !== req_cnpj) {
        return res.status(400).json({
          message: 'CNPJ already used.',
          fields: ['company_cnpj'],
        });
      }

      updatedCompany.set('cnpj', sanitizedCNPJ);
    }

    if (company_phone) {
      const sanitizedPhone = company_phone.replace(/[^0-9]/g, '');

      if (!validatePhone(sanitizedPhone)) {
        return res.status(400).json({
          message: 'Invalid Phone.',
          fields: ['company_phone'],
        });
      }

      updatedCompany.set('phone', sanitizedPhone);
    }

    if (company_cellphone) {
      const sanitizedCellphone = company_cellphone.replace(/[^0-9]/g, '');

      if (!validatePhone(sanitizedCellphone)) {
        return res.status(400).json({
          message: 'Invalid Cellphone.',
          fields: ['company_cellphone'],
        });
      }

      updatedCompany.set('cellphone', sanitizedCellphone);
    }

    if (company_name) {
      updatedCompany.set('name', company_name);
    }

    if (company_address) {
      updatedCompany.set('address', company_address);
    }

    if (company_website) {
      updatedCompany.set('website', company_website);
    }

    const newUserData: Partial<Users> = {};

    updatedUser.forEach((value: string, key: string) => {
      Object.defineProperty(newUserData, key, {
        value,
        enumerable: true,
      });
    });

    const newCompanyData: Partial<Users> = {};

    updatedCompany.forEach((value: string, key: string) => {
      Object.defineProperty(newCompanyData, key, {
        value,
        enumerable: true,
      });
    });

    const result = await UsersRepository.updateUserByUID({
      uid: id,
      userData: newUserData,
      companyData: newCompanyData,
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

    return res.json({
      message: 'ok',
      data: {
        ...result,
      },
    });
  }
}

export default new UsersController();
