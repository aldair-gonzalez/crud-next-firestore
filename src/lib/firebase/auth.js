import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut as signOutFirebase
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase";
import { createAlumno, createProfesor } from "./crud/create";

export const signIn = async (user) => {
  try {
    const userSigned = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const idToken = await userSigned.user.getIdToken();

    await fetch("api/auth/session", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const signUp = async ({ user, sendEmail, rolAsignado }) => {
  try {
    const userCreated = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    await fetch("api/auth/custom-rol", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-uid": userCreated.user.uid,
        "x-rol": rolAsignado.nombre,
      },
    });

    switch (rolAsignado.nombre) {
      case "profesor":
        await createProfesor(user);
        break;

      case "alumno":
        await createAlumno(user);
        break;

      default:
        break;
    }

    sendEmail && (await sendEmailVerification(userCreated.user));
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await signOutFirebase(auth)
    await fetch("api/auth/session", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
};

export const verifyEmailAccount = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
