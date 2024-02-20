"use server";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";

import { auth, db } from "./firebase/firebase";

/**
 * Función para registrar un nuevo usuario.
 * Crea un nuevo usuario con correo electrónico y contraseña utilizando Firebase Authentication.
 * Almacena la información del usuario en la colección 'usuarios' de Firestore.
 * Dependiendo del rol del usuario, almacena una referencia a ese usuario en la colección correspondiente ('profesores' o 'alumnos').
 * Envía un correo electrónico de verificación al usuario.
 *
 * @param {Object} user - El objeto del usuario.
 * @param {string} user.email - El correo electrónico del usuario.
 * @param {string} user.password - La contraseña del usuario.
 * @param {Object} user.rolAsigned - El rol asignado al usuario.
 * @throws {Error} Si ocurre un error durante el proceso de registro.
 * @param {...any} user.rest - Otros datos del usuario.
 */

export const signUp = async ({ email, password, rolAsigned, ...rest }) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = createdUser.user;
    auth.currentUser = firebaseUser;

    await setDoc(doc(db, "usuarios", firebaseUser.uid), {
      email,
      ...rest,
      rol: doc(db, "roles", rolAsigned.id),
    });

    let collection;
    let additionalData = {};
    switch (rolAsigned.nombre) {
      case "profesor":
        collection = "profesores";
        additionalData = {
          instrumento: doc(db, "instrumentos", user?.instrumento),
        };
        break;
      case "alumno":
        collection = "alumnos";
        additionalData = { profesor: doc(db, "profesores", user?.profesor) };
        break;
      default:
        return;
    }

    await setDoc(doc(db, collection, firebaseUser.uid), {
      usuario: doc(db, "usuarios", firebaseUser.uid),
      ...additionalData,
    });
    await sendEmailVerification(firebaseUser);
  } catch (error) {
    throw error;
  }
};

/**
 * Función para enviar un correo electrónico de verificación al usuario actual.
 * Utiliza Firebase Authentication para enviar el correo electrónico de verificación.
 */
export const verifyEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
  } catch (error) {
    throw error;
  }
};

/**
 * Función para iniciar sesión de un usuario.
 * Inicia sesión con correo electrónico y contraseña utilizando Firebase Authentication.
 * Obtiene el rol del usuario de Firestore y lo almacena en una cookie junto con otros datos de la sesión del usuario.
 *
 * @param {Object} param0 - El objeto con el correo electrónico y la contraseña del usuario.
 * @param {string} param0.email - El correo electrónico del usuario.
 * @param {string} param0.password - La contraseña del usuario.
 */
export const signIn = async ({ email, password }) => {
  try {
    const userSigned = await signInWithEmailAndPassword(auth, email, password);
    auth.currentUser = userSigned.user;

    const userDoc = await getDoc(doc(db, "usuarios", userSigned.user.uid));
    const rol = (await getDoc(userDoc.data().rol)).data().nombre;

    const user = {
      token: userSigned.user.accessToken,
      email: userSigned.user.email,
      emailVerified: userSigned.user.emailVerified,
      rol,
    };

    const expirationTime = new Date(
      userSigned.user.stsTokenManager.expirationTime
    );
    cookies().set("user", JSON.stringify(user), {
      expires: expirationTime,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Función para cerrar la sesión del usuario actual.
 * Cierra la sesión utilizando Firebase Authentication y elimina la cookie del usuario.
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    cookies().delete("user");
  } catch (error) {
    throw error;
  }
  return true;
};
