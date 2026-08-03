import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface JwtPayload {
  role?: string;
  exp?: number;
  [key: string]: unknown;
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const payload = token ? decodeJwt(token) : null;
  const isTokenExpired = payload?.exp ? payload.exp * 1000 < Date.now() : false;
  const isAuthenticated = Boolean(token && payload && !isTokenExpired);
  const userRole = payload?.role ? payload.role.toUpperCase() : null;

  // 1. Protected routes protection (/dashboard and sub-routes)
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const defaultRolePath = userRole ? `/dashboard/${userRole.toLowerCase()}` : "/dashboard/customer";

    // Handle root /dashboard redirect
    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      return NextResponse.redirect(new URL(defaultRolePath, request.url));
    }

    // Role-based access control (RBAC)
    if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL(defaultRolePath, request.url));
    }
    if (pathname.startsWith("/dashboard/provider") && userRole !== "PROVIDER") {
      return NextResponse.redirect(new URL(defaultRolePath, request.url));
    }
    if (pathname.startsWith("/dashboard/customer") && userRole !== "CUSTOMER") {
      return NextResponse.redirect(new URL(defaultRolePath, request.url));
    }
  }

  // 2. Public Auth routes protection (/login, /register)
  if (pathname === "/login" || pathname === "/register") {
    if (isAuthenticated) {
      const defaultRolePath = userRole ? `/dashboard/${userRole.toLowerCase()}` : "/dashboard/customer";
      return NextResponse.redirect(new URL(defaultRolePath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
