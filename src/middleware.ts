import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthService } from "@/services/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;
  const protectedRoutes = ["/admin", "/dashboard"];
  const publicRoutes = ["/", "/markets"];

  // Skip middleware for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Redirect to dashboard if logged in
  if (publicRoutes.includes(request.nextUrl.pathname) && token) {
    try {
      await AuthService.verifySession(token);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
      // Invalid token - proceed normally
    }
  }

  // Protect admin routes
  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await AuthService.verifySession(token);
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("session_token");
      return response;
    }
  }

  return NextResponse.next();
}
