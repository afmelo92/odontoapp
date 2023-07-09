import { NextFunction, Request, Response } from 'express';

export default async function personalAction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id } = request.params;
    const { user } = request;

    if (id !== user.id && user.role !== 'ADMIN') {
      return response.status(403).json({
        message: 'Unauthorized.',
      });
    }

    return next();
  } catch (error) {
    return response.status(403).json({
      message: 'JWT token missing',
    });
  }
}
