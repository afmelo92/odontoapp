import prisma from '@/db';
import { ProstheticOrders } from '@prisma/client';
import { addDays } from 'date-fns';

type CreateProstheticOrder = Omit<
  ProstheticOrders,
  'status' | 'createdAt' | 'updatedAt' | 'id' | 'uid'
>;

class ProstheticOrdersRepository {
  public async createProstheticOrder({
    dentist_clinic = null,
    dentist_name = null,
    dentist_uid = null,
    description = null,
    elements = [],
    lab_uid = '',
    patient_name = null,
    patient_uid = null,
    service_color = null,
    service_deadline = addDays(new Date(), 9),
    service_material = null,
    service_name = null,
    total = 0,
  }: CreateProstheticOrder) {
    const order = await prisma.prostheticOrders.create({
      data: {
        dentist_clinic,
        dentist_name,
        dentist_uid,
        description,
        elements,
        lab_uid,
        patient_name,
        patient_uid,
        service_color,
        service_deadline,
        service_material,
        service_name,
        total,
        status: 1,
      },
    });

    return order;
  }
}

export default new ProstheticOrdersRepository();
