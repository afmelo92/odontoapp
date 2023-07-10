/* eslint-disable no-unused-vars */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
      role: 'ADMIN' | 'DENTIST' | 'LAB' | 'PATIENT';
      company: {
        primary_email: string | null | undefined;
        secondary_email: string | null | undefined;
        cnpj: string | null | undefined;
      };
    };
  }
}
