"use server";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";

import { auth, db } from "./firebase/firebase";

export const signUp = async (user) => {
  try {
    const { email, password, rolAsigned, ...rest } = user;
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = createdUser.user;
    auth.currentUser = firebaseUser;

    // Almacena los datos del usuario en la colección 'usuarios'
    await setDoc(doc(db, "usuarios", firebaseUser.uid), {
      email,
      ...rest,
      rol: doc(db, "roles", rolAsigned.id),
    });

    // Decide en qué colección almacenar la referencia del usuario
    let collection;
    let additionalData = {};
    switch (rolAsigned.nombre) {
      case "profesor":
        collection = "profesores";
        // Aquí puedes agregar los campos adicionales para el profesor
        additionalData = {
          instrumento: doc(db, "instrumentos", user?.instrumento),
        };
        break;
      case "alumno":
        collection = "alumnos";
        // Aquí puedes agregar los campos adicionales para el alumno
        additionalData = { profesor: doc(db, "profesores", user?.profesor) };
        break;
      default:
        // No necesitamos almacenar una referencia para los administradores
        return;
    }

    // Almacena la referencia del usuario y los datos adicionales en la colección correspondiente
    await setDoc(doc(db, collection, firebaseUser.uid), {
      usuario: doc(db, "usuarios", firebaseUser.uid),
      ...additionalData,
    });
    await sendEmailVerification(firebaseUser);
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
  } catch (error) {
    return { error: error.message, code: error.code };
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const userSigned = await signInWithEmailAndPassword(auth, email, password);
    auth.currentUser = userSigned.user;
    const user = {
      token: userSigned.user.accessToken,
      email: userSigned.user.email,
      emailVerified: userSigned.user.emailVerified,
      displayName: userSigned.user.displayName,
    };

    const expirationTime = new Date(
      userSigned.user.stsTokenManager.expirationTime
    );
    cookies().set("user", JSON.stringify(user), {
      expires: expirationTime,
      httpOnly: true,
      secure: true,
    });
  } catch (error) {
    return { error: error.message, code: error.code };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    cookies().delete("user");
  } catch (error) {
    return { error: error.message, code: error.code };
  }
  return true;
};
