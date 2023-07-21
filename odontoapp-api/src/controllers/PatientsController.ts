import { TypedRequestBody, TypedRequestParams } from '@/routes';
import { mapBodyErrorFields } from '@/utils';
import { valida_cpf, validateEmail, validatePhone } from '@/utils/validators';
import { Request, Response } from 'express';
import { isAfter } from 'date-fns';
import { Patients } from '@prisma/client';
import UsersRepository from '@/repositories/UsersRepository';
import prisma from '@/db';

type CreatePatientBody = {
  patient_name: string;
  patient_email: string;
  patient_address: string;
  patient_address_number: string;
  patient_zip: string;
  patient_cellphone: string;
  patient_cpf: string;
  patient_birth: string;
  patient_sex: 'M' | 'F';
};

class PatientsController {
  public async create(req: TypedRequestBody<CreatePatientBody>, res: Response) {
    const { id: req_id } = req.user;
    const {
      patient_name,
      patient_email,
      patient_address,
      patient_zip,
      patient_cellphone,
      patient_cpf,
      patient_birth,
      patient_sex,
    } = req.body;

    if (
      !patient_name ||
      !patient_email ||
      !patient_address ||
      !patient_zip ||
      !patient_cellphone ||
      !patient_cpf ||
      !patient_birth ||
      !patient_sex
    ) {
      return res.status(400).json({
        message: 'All fields required.',
        fields: mapBodyErrorFields(req.body),
      });
    }

    const newPatient = new Map();

    const sanitizedCPF = patient_cpf.replace(/[^0-9]/g, '');

    if (!valida_cpf(sanitizedCPF)) {
      return res.status(400).json({
        message: 'Invalid CPF.',
        fields: ['patient_cpf'],
      });
    }

    const alreadyRegisteredPatientForThisUser = await prisma.users.findFirst({
      where: {
        uid: req_id,
        patients: {
          some: {
            cpf: {
              equals: sanitizedCPF,
            },
          },
        },
      },
      select: {
        patients: {
          where: {
            cpf: sanitizedCPF,
          },
        },
      },
    });

    if (alreadyRegisteredPatientForThisUser) {
      return res.status(400).json({
        message: 'You already have a patient with this CPF',
        fields: ['patient_cpf'],
      });
    }

    newPatient.set('cpf', sanitizedCPF);

    if (!validateEmail(patient_email)) {
      return res.status(400).json({
        message: 'Invalid e-mail.',
        fields: ['patient_email'],
      });
    }

    newPatient.set('email', patient_email);

    if (patient_sex !== 'M' && patient_sex !== 'F') {
      return res.status(400).json({
        message: 'Invalid sex.',
        fields: ['patient_sex'],
      });
    }

    newPatient.set('sex', patient_sex === 'M');

    if (isAfter(new Date(patient_birth), new Date())) {
      return res.status(400).json({
        message: 'Invalid birth date.',
        fields: ['patient_birth'],
      });
    }

    newPatient.set('birth', new Date(patient_birth).toISOString());

    const sanitizedPhone = patient_cellphone.replace(/[^0-9]/g, '');

    if (!validatePhone(sanitizedPhone)) {
      return res.status(400).json({
        message: 'Invalid cellphone/phone.',
        fields: ['patient_cellphone'],
      });
    }

    newPatient.set('name', patient_name);
    newPatient.set('address', patient_address);

    const sanitizedZip = patient_zip.replace(/[^0-9]/g, '');

    newPatient.set('zip_code', sanitizedZip);

    const newPatientData = {} as Omit<
      Patients,
      'id' | 'uid' | 'role' | 'createdAt' | 'updatedAt'
    >;

    newPatient.forEach((value: string, key: string) => {
      Object.defineProperty(newPatientData, key, {
        value,
        enumerable: true,
      });
    });

    const patient = await UsersRepository.createOrConnectPatient({
      dentistUid: req_id,
      patientData: {
        ...newPatientData,
      },
    });

    return res.status(201).json({
      message: 'ok',
      data: patient || [],
    });
  }

  public async index(req: Request, res: Response) {
    const patients = await UsersRepository.findAllPatients();

    return res.json({
      message: 'ok',
      data: patients,
    });
  }

  public async show(req: Request, res: Response) {
    const { id: req_id } = req.user;

    const patients = await UsersRepository.findPatientsByUID({
      dentistId: req_id,
    });

    return res.json({
      message: 'ok',
      data: patients,
    });
  }

  public async delete(
    req: TypedRequestParams<{ patient_id: string }>,
    res: Response
  ) {
    const { patient_id } = req.params;
    const { id: dentist_id } = req.user;

    await UsersRepository.disconnectPatient({
      userId: dentist_id,
      patientId: patient_id,
    });

    return res.json({
      message: 'ok',
    });
  }
}

export default new PatientsController();
