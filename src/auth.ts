import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
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
      token.roles = dbUser?.roles;
      token.id = dbUser?.id;
      token.isActive = dbUser?.isActive;
      return token;
    },
    session({ session, token }) {
      console.log(token);

      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
