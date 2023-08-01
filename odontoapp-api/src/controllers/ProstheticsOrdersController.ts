import prisma from '@/db';
import { colorScale, newServices } from '@/etc/constants';
import ProstheticOrdersRepository from '@/repositories/ProstheticOrdersRepository';
import { mapBodyErrorFields } from '@/utils';
import { validateUUID } from '@/utils/validators';
import { ProstheticOrders } from '@prisma/client';
import { isBefore } from 'date-fns';
import { Request, Response } from 'express';

class ProstheticsOrdersController {
  public async create(req: Request, res: Response) {
    const { id: req_id, company: req_company, role: req_role } = req.user;
    const {
      prosthetic_order_dentist_name = null,
      prosthetic_order_clinic_name = null,
      prosthetic_order_patient_name = null,
      prosthetic_order_patient_uid = null,
      prosthetic_order_lab_uid = null,
      prosthetic_order_service_id = null,
      prosthetic_order_options_id = null,
      prosthetic_order_color_id = null,
      prosthetic_order_deadline = null,
      prosthetic_order_teeth_elements = [],
      prosthetic_order_description = null,
    } = req.body;

    const newProstheticOrder = new Map();
    let currentTotal = 0;

    newProstheticOrder.set('total', 0);

    if (req_role === 'DENTIST') {
      if (
        !prosthetic_order_patient_uid ||
        !prosthetic_order_lab_uid ||
        !prosthetic_order_service_id ||
        !prosthetic_order_deadline ||
        !prosthetic_order_teeth_elements
      ) {
        return res.status(400).json({
          message: 'Fields required.',
          fields: mapBodyErrorFields(req.body),
        });
      }

      if (!validateUUID(prosthetic_order_patient_uid)) {
        return res.status(400).json({
          message: 'Invalid patient id.',
          fields: ['prosthetic_order_patient_uid'],
        });
      }

      if (!validateUUID(prosthetic_order_lab_uid)) {
        return res.status(400).json({
          message: 'Invalid patient/lab id.',
          fields: ['prosthetic_order_lab_uid'],
        });
      }

      const [patient, lab] = await Promise.all([
        prisma.patients.findUnique({
          where: {
            uid: prosthetic_order_patient_uid,
          },
        }),
        prisma.companies.findUnique({
          where: {
            uid: prosthetic_order_lab_uid,
          },
        }),
      ]);

      if (!patient) {
        return res.status(400).json({
          message: 'Patient not found',
          fields: ['prosthetic_order_patient_uid'],
        });
      }

      newProstheticOrder.set('patient_uid', patient.uid);

      if (!lab) {
        return res.status(400).json({
          message: 'Lab not found',
          fields: ['prosthetic_order_lab_uid'],
        });
      }

      newProstheticOrder.set('lab_uid', lab.uid);
      newProstheticOrder.set('dentist_uid', req_id);

      newProstheticOrder.set('dentist_name', null);
      newProstheticOrder.set('patient_name', null);
      newProstheticOrder.set('dentist_clinic', null);
    }

    if (req_role === 'LAB') {
      if (
        !prosthetic_order_dentist_name ||
        !prosthetic_order_patient_name ||
        !prosthetic_order_deadline ||
        !prosthetic_order_service_id ||
        !prosthetic_order_teeth_elements
      ) {
        return res.status(400).json({
          message: 'Fields required.',
          fields: mapBodyErrorFields(req.body),
        });
      }

      newProstheticOrder.set('lab_uid', req_company.uid);
      newProstheticOrder.set('patient_uid', null);
      newProstheticOrder.set('dentist_uid', null);

      newProstheticOrder.set('dentist_name', prosthetic_order_dentist_name);
      newProstheticOrder.set('patient_name', prosthetic_order_patient_name);
      newProstheticOrder.set(
        'dentist_clinic',
        prosthetic_order_clinic_name || null
      );
    }

    if (isNaN(new Date(prosthetic_order_deadline).valueOf())) {
      return res.status(400).json({
        message: 'Invalid deadline.',
        fields: ['prosthetic_order_deadline'],
      });
    }

    if (isBefore(new Date(prosthetic_order_deadline), new Date())) {
      return res.status(400).json({
        message: 'Invalid deadline.',
        fields: ['prosthetic_order_deadline'],
      });
    }

    newProstheticOrder.set(
      'service_deadline',
      new Date(prosthetic_order_deadline).toISOString()
    );

    const hasService = newServices.find(
      (service) => service.id === Number(prosthetic_order_service_id)
    );

    if (!hasService) {
      return res.status(400).json({
        message: 'Invalid service.',
        fields: ['prosthetic_order_service_id'],
      });
    }

    currentTotal = hasService.price || 0;

    newProstheticOrder.set('service_name', hasService.title);

    if (hasService.elements && prosthetic_order_teeth_elements.length <= 0) {
      return res.status(400).json({
        message: 'Elements required.',
        fields: ['prosthetic_order_teeth_elements'],
      });
    }

    if (!Array.isArray(prosthetic_order_teeth_elements)) {
      return res.status(400).json({
        message: 'Invalid elements.',
        fields: ['prosthetic_order_teeth_elements'],
      });
    }

    let hasInvalidValue = false;
    prosthetic_order_teeth_elements.forEach((el) => {
      if (typeof el !== 'number') {
        hasInvalidValue = true;
      }
    });

    if (hasInvalidValue) {
      return res.status(400).json({
        message: 'Invalid elements.',
        fields: ['prosthetic_order_teeth_elements'],
      });
    }

    newProstheticOrder.set('elements', prosthetic_order_teeth_elements);
    newProstheticOrder.set('service_material', null);

    let hasOption;

    if (hasService.options.length > 0) {
      hasOption = hasService.options.find(
        (option) => option.id === Number(prosthetic_order_options_id)
      );

      if (!hasOption) {
        return res.status(400).json({
          message: 'Invalid options.',
          fields: ['prosthetic_order_options_id'],
        });
      }

      currentTotal = hasOption.price;

      newProstheticOrder.set('service_material', hasOption.title);
    }

    if (hasService.elements) {
      currentTotal = currentTotal * newProstheticOrder.get('elements').length;
    }

    newProstheticOrder.set('total', currentTotal);

    newProstheticOrder.set('service_color', null);

    if (hasService.colors) {
      const hasColor = colorScale.find(
        (color) => color.id === Number(prosthetic_order_color_id)
      );

      if (!hasColor) {
        return res.status(400).json({
          message: 'Invalid color.',
          fields: ['prosthetic_order_color_id'],
        });
      }

      newProstheticOrder.set('service_color', hasColor.title);
    }

    newProstheticOrder.set('description', prosthetic_order_description || null);

    const newProstheticOrderData = {} as Omit<
      ProstheticOrders,
      'id' | 'uid' | 'createdAt' | 'updatedAt'
    >;

    newProstheticOrder.forEach((value: string, key: string) => {
      Object.defineProperty(newProstheticOrderData, key, {
        value,
        enumerable: true,
      });
    });

    await ProstheticOrdersRepository.createProstheticOrder({
      ...newProstheticOrderData,
    });

    return res.status(201).json({ message: 'ok' });
  }

  public async index(req: Request, res: Response) {
    const { id, role, company } = req.user;
    let dynamicWhere = {};

    switch (role) {
      case 'DENTIST':
        dynamicWhere = {
          dentist_uid: id,
        };
        break;
      case 'LAB':
        dynamicWhere = {
          lab_uid: company.uid,
        };
        break;
      case 'ADMIN':
        dynamicWhere = {};
        break;
      default:
        return res.status(400).json({ message: 'Invalid role.' });
    }

    const orders = await prisma.prostheticOrders.findMany({
      where: dynamicWhere,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        lab: {
          select: {
            name: true,
          },
        },
        dentist: {
          select: {
            name: true,
          },
        },
        patient: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.json({
      message: 'ok',
      data: orders,
    });
  }
}

export default new ProstheticsOrdersController();
