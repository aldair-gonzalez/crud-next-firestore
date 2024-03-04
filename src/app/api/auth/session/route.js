import { auth } from "firebase-admin";

import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import firebaseConfig from "@/config/firebase.config";
import { runAdminApp } from "@/lib/firebase/firebase-admin";

runAdminApp();

// Obtener una sesión
export const GET = async () => {
  try {
    const cookieSession = cookies().get(
      firebaseConfig.SESSION_COOKIE_NAME
    )?.value;
    const sessionCookie = await auth().verifySessionCookie(cookieSession);
    await auth().getUser(sessionCookie.uid);

    return NextResponse.json(
      {
        isLogged: true,
        rol: sessionCookie.rol,
        email_verified: sessionCookie.email_verified,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message, code: error.code },
      { status: 500 }
    );
  }
};

// Crear una sesión
export const POST = async () => {
  try {
    const idToken = headers().get("Authorization").split("Bearer ")[1];
    const decodedIdToken = await auth().verifyIdToken(idToken);

    if (!(new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60)) {
      return NextResponse.json(
        { isLogged: false, error: "Token expired" },
        { status: 401 }
      );
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set(firebaseConfig.SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      maxAge: expiresIn,
      secure: true,
      sameSite: "strict",
    });

    return NextResponse.json({ isLogged: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message },
      { status: 400 }
    );
  }
};

// Eliminar una sesión
export const DELETE = async () => {
  try {
    cookies().delete(firebaseConfig.SESSION_COOKIE_NAME);
    return NextResponse.json({ isLogged: false }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message },
      { status: 400 }
    );
  }
};
