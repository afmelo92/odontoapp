import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import config from '@/etc/config';
import prisma from '@/db';

interface IUserTokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        message: 'JWT token missing.',
      });
    }

    const [, token] = authHeader.split(' ');

    const { secret } = config.jwt;

    const decoded = verify(token, secret);

    const { sub } = decoded as IUserTokenPayload;

    const user = await prisma.users.findUnique({
      where: {
        uid: sub,
      },
      include: {
        company: true,
      },
    });

    if (!user) {
      return response.status(401).json({
        message: 'Unauthorized.',
      });
    }

    const { role, email } = user;

    request.user = {
      id: sub,
      role,
      email,
      company: {
        primary_email: user.company?.primary_email,
        secondary_email: user.company?.secondary_email,
        cnpj: user.company?.cnpj,
      },
    };

    return next();
  } catch (err) {
    return response.status(401).json({
      message: 'JWT token missing',
    });
  }
}
