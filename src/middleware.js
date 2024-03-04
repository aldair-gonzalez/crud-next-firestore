import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import firebaseConfig from "./config/firebase.config";

export const middleware = async (req) => {
  const { pathname, origin } = req.nextUrl;
  try {
    const cookieSession = cookies().get(
      firebaseConfig.SESSION_COOKIE_NAME
    )?.value;

    if (
      (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) &&
      !cookieSession
    ) {
      return NextResponse.next();
    } else if (
      (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) &&
      cookieSession
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const data = await (
      await fetch(`${origin}/api/auth/session`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: `${firebaseConfig.SESSION_COOKIE_NAME}=${cookieSession}`,
        },
      })
    ).json();

    if (data?.error && data?.code === "auth/user-not-found") {
      return NextResponse.redirect(new URL("/sign-in", req.url), {
        headers: {
          "Set-Cookie": `${firebaseConfig.SESSION_COOKIE_NAME}=; Path=/; Max-Age=0`,
          "Cache-Control": "no-store",
        },
      });
    }

    if (!data.isLogged) {
      return NextResponse.redirect(new URL("/sign-in", req.url), {
        headers: {
          "Set-Cookie": `${firebaseConfig.SESSION_COOKIE_NAME}=; Path=/; Max-Age=0`,
          "Cache-Control": "no-store",
        },
      });
    }

    if (!Boolean(data.email_verified)) {
      return NextResponse.redirect(new URL("/email-verified", req.url));
    }

    if (
      Boolean(data.email_verified) &&
      pathname.startsWith("/email-verified")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      (pathname.startsWith("/usuarios") ||
        pathname.startsWith("/roles") ||
        pathname.startsWith("/alumnos")) &&
      data.rol === "alumno"
    ) {
      return NextResponse.redirect(new URL("/no-autorizado", req.url));
    }

    if (
      (pathname.startsWith("/usuarios") || pathname.startsWith("/roles")) &&
      data.rol === "profesor"
    ) {
      return NextResponse.redirect(new URL("/no-autorizado", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/sign-in", req.url), {
      headers: {
        "Set-Cookie": `${firebaseConfig.SESSION_COOKIE_NAME}=; Path=/; Max-Age=0`,
        "Cache-Control": "no-store",
      },
    });
  }
};

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/usuarios:path*",
    "/roles:path*",
    "/profesores:path*",
    "/alumnos:path*",
    "/clases:path*",
  ],
};
