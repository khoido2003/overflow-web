import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import jwt from "jsonwebtoken";

import authConfig from "./auth.config";
import { db } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },

  ...authConfig,

  // Custome page login
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      // If required credentials user need email verification but does not need do that with google or github sign in
    },
  },

  // Prepare user information in session
  callbacks: {
    // Decide whether user is allowed to login or not
    async signIn() {
      return true;
    },

    // Prepare user information in jwt token
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email as string,
        },
      });

      if (!dbUser) {
        token.id = user.id as string;
        return token;
      }

      // Sign a jwt token to validated in the backend
      const jwtToken = jwt.sign(
        {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          image: dbUser.image,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: process.env.JWT_EXPIRES_IN!,
        },
      );

      return {
        id: dbUser.id,
        token: jwtToken,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
      };
    },

    // Decode the jwt token and add data to the session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.picture;
        session.user.username = token.username;
        session.user.token = token.token;
      }

      return session;
    },

    redirect() {
      return "/";
    },
  },
});
