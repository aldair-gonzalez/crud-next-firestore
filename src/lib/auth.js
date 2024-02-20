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

export const verifyEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
  } catch (error) {
    throw error;
  }
};

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

export const logOut = async () => {
  try {
    await signOut(auth);
    cookies().delete("user");
  } catch (error) {
    throw error;
  }
  return true;
};
