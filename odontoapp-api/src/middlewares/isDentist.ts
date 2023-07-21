import { Request, Response, NextFunction } from 'express';

export default async function isDentist(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { user } = request;

    if (!user) {
      return response.status(401).json({
        error: 'JWT token missing',
      });
    }

    const { role } = user;

    if (role !== 'DENTIST' && role !== 'ADMIN') {
      return response.status(403).json({
        error: 'Unauthorized.',
      });
    }

    return next();
  } catch (err) {
    return response.status(401).json({
      error: 'JWT token missing',
    });
  }
}
