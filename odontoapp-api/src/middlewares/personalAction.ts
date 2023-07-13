import { validateUUID } from '@/utils/validators';
import { NextFunction, Request, Response } from 'express';

export default async function personalAction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id, patient_id } = request.params;
    const { user } = request;

    if (id !== user.id && user.role !== 'ADMIN' && !patient_id) {
      return response.status(403).json({
        message: 'Unauthorized.',
      });
    }

    if (id && !validateUUID(id)) {
      return response.status(403).json({
        message: 'Invalid id.',
      });
    }

    if (patient_id && !validateUUID(patient_id)) {
      return response.status(403).json({
        message: 'Invalid id.',
      });
    }

    return next();
  } catch (error) {
    return response.status(403).json({
      message: 'JWT token missing',
    });
  }
}
