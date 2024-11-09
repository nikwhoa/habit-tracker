import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add paths that should be accessible without authentication
const publicPaths = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
];

// Add paths that should redirect authenticated users
const authOnlyPaths = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = authOnlyPaths.some((path) => pathname.startsWith(path));

  // Redirect authenticated users away from auth pages
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL("/habits", request.url));
  }

  // Redirect unauthenticated users to login
  if (!token && !isPublicPath) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public|assets).*)"],
};
