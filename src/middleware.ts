import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req) => {
  // Current url
  const { nextUrl } = req;

  if (nextUrl.pathname === "/") return null;

  // Check if there is a session token
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some((route) => {
    return nextUrl.pathname.startsWith(route);
  });

  // console.log(isPublicRoute);
  // console.log(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If in login or register, then no redirect
  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    // If user has login then redirect to home page
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // User access protected route but did not login then redirect them to login page
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
