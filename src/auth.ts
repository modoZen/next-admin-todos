import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { signInEmailPassord } from "./auth/actions/auth-actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        username: {
          label: "Correo electrónico",
          type: "email",
          placeholder: "usuario@google.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "******",
        },
      },
      authorize: async (credentials) => {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassord(
          credentials.username as string,
          credentials.password as string
        );

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }
        // If you return null then an error will be displayed advising the user to check their details.
        return null;

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn({ user }) {
      return true;
    },
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email! },
      });
      if (dbUser?.isActive === false) {
        throw Error("Usuario no activo");
      }
      token.roles = dbUser?.roles;
      token.id = dbUser?.id;
      return token;
    },
    session({ session, token }) {
      if (session && session.user) {
        session.user.roles = token.roles as string[];
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
