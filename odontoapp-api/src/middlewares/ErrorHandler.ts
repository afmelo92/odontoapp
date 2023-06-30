/* eslint-disable @typescript-eslint/no-unused-vars */
import logger from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.log({
    level: 'error',
    message: err as string,
  });
  res.status(500);
  res.json({ message: 'Oops! Something went wrong.' });
}
