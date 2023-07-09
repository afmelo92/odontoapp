/* eslint-disable no-unused-vars */
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser extends User {
  address?: string | null;
  post?: string | null;
  birth?: string | null;
  cpf?: string | null;
  id?: string;
  cro?: string | null;
  company?: {
    name?: string | null;
    cnpj?: string | null;
    address?: string | null;
    primary_email?: string | null;
    secondary_email?: string | null;
    cellphone?: string | null;
    phone?: string | null;
    website?: string | null;
  };
}

declare module "next-auth" {
  interface User {
    address?: string;
    accessToken?: string;
  }

  interface Session {
    user?: IUser;
  }
}

declare module "next-auth/jwt" {
  // Tudo aqui dentro é token
  interface JWT {
    user?: IUser;
  }
}
