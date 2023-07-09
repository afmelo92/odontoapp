import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export interface UpdateResponse extends Response {
  data: SessionUpdateData;
}

export type SessionUpdateData = {
  address: string | null;
  birth: string | null;
  cellphone: string | null;
  cpf: string;
  cro: string | null;
  email: string;
  uid: string;
  post: string | null;
  name: string;
  phone: string | null;
  company: {
    address: string | null;
    primary_email: string | null;
    secondary_email: string | null;
    cellphone: string | null;
    cnpj: string | null;
    name: string | null;
    phone: string | null;
    website: string | null;
  } | null;
};

type LoginProps = {
  email: string;
  password: string;
};

const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 86400,
  },
  pages: {
    signIn: "/signin",
    newUser: "/",
    signOut: "/signin",
    error: "466",
  },
  secret: "default",
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "Insira seu e-mail",
        },
        password: {
          label: "Senha",
          type: "password",
          placeholder: "Insira sua senha",
        },
      },
      async authorize(credentials) {
        console.log({ authorizeCredentials: credentials });

        const { email, password } = credentials as LoginProps;

        const response = await fetch("http://localhost:3333/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const parsed = await response.json();

        if (response.ok) {
          const { user, token: accessToken } = parsed.data;

          return { accessToken, ...user };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user, session, trigger }) {
      const updatedSessionData = session as SessionUpdateData;

      if (user) {
        token.user = { ...user };
      }

      if (trigger === "update" && token.user) {
        if (updatedSessionData?.name) {
          token.user.name = updatedSessionData.name;
        }

        if (updatedSessionData?.email) {
          token.user.email = updatedSessionData.email;
        }

        if (updatedSessionData?.address) {
          token.user.address = updatedSessionData.address;
        }

        if (updatedSessionData?.post) {
          token.user.post = updatedSessionData.post;
        }

        if (updatedSessionData?.cro) {
          token.user.cro = updatedSessionData.cro;
        }

        if (updatedSessionData?.birth) {
          token.user.birth = updatedSessionData.birth.split("T")[0];
        }

        if (token.user.company) {
          if (updatedSessionData?.company?.address) {
            token.user.company.address = updatedSessionData.company.address;
          }

          if (updatedSessionData?.company?.cnpj) {
            token.user.company.cnpj = updatedSessionData.company.cnpj;
          }

          if (updatedSessionData?.company?.name) {
            token.user.company.name = updatedSessionData.company.name;
          }

          if (updatedSessionData?.company?.primary_email) {
            token.user.company.primary_email =
              updatedSessionData.company.primary_email;
          }

          if (updatedSessionData?.company?.secondary_email) {
            token.user.company.secondary_email =
              updatedSessionData.company.secondary_email;
          }

          if (updatedSessionData?.company?.cellphone) {
            token.user.company.cellphone = updatedSessionData.company.cellphone;
          }

          if (updatedSessionData?.company?.phone) {
            token.user.company.phone = updatedSessionData.company.phone;
          }

          if (updatedSessionData?.company?.website) {
            token.user.company.website = updatedSessionData.company.website;
          }
        }
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.user = token.user;

      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);
