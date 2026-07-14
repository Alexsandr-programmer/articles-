import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = [
  "/dashboard",
  "/profile",
  "/create-article",
  "/admin",
  "/verify-email",
  "/email-verified",
] as const;

const authRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
] as const;

function isProtectedPath(pathname: string) {
  if (
    protectedPrefixes.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    )
  ) {
    return true;
  }
  return /^\/[^/]+\/edit\/?$/.test(pathname);
}

function isAuthRoute(pathname: string) {
  return authRoutes.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

/**
 * Optimistic UX gate only — cookie presence, not session validation.
 * Real auth enforcement lives in the DAL (`lib/auth/dal.ts`).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname) && !isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (isProtectedPath(pathname) && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute(pathname) && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
