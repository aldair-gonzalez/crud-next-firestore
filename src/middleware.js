import { NextResponse } from "next/server";

export function middleware(request) {
  const cookie = request.cookies.get("user");
  const user = cookie ? JSON.parse(cookie.value) : null;
  if (!user) return NextResponse.redirect(new URL("/sign-in", request.url));
  if (!Boolean(user.emailVerified)) {
    request.cookies.delete("user");
    return NextResponse.redirect(new URL("/email-verified", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/usuarios:path*",
    "/roles:path*",
    "/alumnos:path*",
    "/clases:path*",
  ],
};
