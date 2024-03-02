import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import firebaseConfig from "./config/firebase.config";

export const middleware = async (req) => {
  const { pathname, origin } = req.nextUrl;
  try {
    const cookieSession = cookies().get(
      firebaseConfig.SESSION_COOKIE_NAME
    )?.value;

    const data = await (
      await fetch(`${origin}/api/auth/session`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: `${firebaseConfig.SESSION_COOKIE_NAME}=${cookieSession}`,
        },
      })
    ).json();

    if (!data.isLogged) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (!Boolean(data.email_verified)) {
      return NextResponse.redirect(new URL("/email-verified", req.url));
    }

    if (
      (pathname.startsWith("/usuarios") ||
        pathname.startsWith("/roles") ||
        pathname.startsWith("/alumnos")) &&
      data.rol === "alumno"
    ) {
      return NextResponse.redirect(new URL("/no-autorizado", req.url));
    }

    if ((
      pathname.startsWith("/usuarios") ||
      pathname.startsWith("/roles")
    ) && data.rol === "profesor") {
      return NextResponse.redirect(new URL("/no-autorizado", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
};

export const config = {
  matcher: [
    "/usuarios:path*",
    "/roles:path*",
    "/profesores:path*",
    "/alumnos:path*",
    "/clases:path*",
  ],
};
