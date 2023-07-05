import NextAuth, { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export interface SessionUser extends User {
  accessToken: string;
  id: string;
  email: string;
  name: string;
  cro: string | null;
  cpf_cnpj: string;
  cellphone: string | null;
  phone: string | null;
  company: string | null;
  address: string | null;
  role: string;
}

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

        if (response.ok) {
          const parsed = await response.json();

          console.dir(
            { nextAuthResponse: parsed },
            { colors: true, depth: null }
          );

          const { user, token: accessToken } = parsed.data;

          return { accessToken, ...user };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ credentials, account, user }) {
      console.dir(
        { signInCredentials: credentials },
        { colors: true, depth: null }
      );
      console.dir({ signInAccount: account }, { colors: true, depth: null });
      console.dir({ signInUser: user }, { colors: true, depth: null });

      return true;
    },
    async jwt({ token, account, user, session, trigger }) {
      console.dir(
        {
          tokenCBtoken: token,
          tokenCBaccount: account,
          tokenCBuser: user,
          tokenCBsession: session,
          tokenCBtrigger: trigger,
        },
        { colors: true, depth: null }
      );

      if (user) {
        token.user = user;
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      console.dir(
        { sessionCBsession: session, sessionCBtoken: token },
        { colors: true, depth: null }
      );

      session.user = token.user as SessionUser;

      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);

// export { handler as GET, handler as POST };
