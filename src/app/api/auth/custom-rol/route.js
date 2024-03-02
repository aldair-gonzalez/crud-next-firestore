import { auth } from "firebase-admin";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const uid = headers().get("x-uid");
    const rol = headers().get("x-rol");

    auth().setCustomUserClaims(uid, { rol });

    return new Response(JSON.stringify({ message: "Rol asignado" }), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
