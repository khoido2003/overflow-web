import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    token?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: UserId;
      username?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string | null;
    };
  }
}
