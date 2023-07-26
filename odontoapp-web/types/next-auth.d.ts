/* eslint-disable no-unused-vars */
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type MenuItem = {
  uid: string;
  title: string;
  href: string;
  icon: string;
  sub: MenuItem[];
};

type Color = { id: number; group: number; title: string };

type Option = {
  id: number;
  title: string;
  price: number;
  elements?: number[];
};

type Service = {
  id: number;
  title: string;
  description: string | null;
  category: number;
  options: Option[];
  elements: boolean;
  colors: number;
  price: number | null;
};

interface IUser extends User {
  address?: string | null;
  post?: string | null;
  birth?: string | null;
  cpf?: string | null;
  id?: string;
  cro?: string | null;
  role?: string | null;
  services?: Service[];
  colorScale?: Color[];
  menu?: MenuItem[];
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
