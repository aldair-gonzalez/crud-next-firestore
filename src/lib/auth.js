"use server"

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase/firebase";
import { cookies } from "next/headers";

export const signUp = async ({ email, password }) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(auth, email, password);
    const user = createdUser.user;
    await sendEmailVerification(user);
  } catch (error) {
    return { error: error.message, code: error.code };
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const userSigned = await signInWithEmailAndPassword(auth, email, password);
    const user = userSigned.user;
    const expirationTime = new Date(user.stsTokenManager.expirationTime);
    cookies().set("user", JSON.stringify(user), {
      expires: expirationTime,
      httpOnly: true,
      secure: true,
    })
  } catch (error) {
    return { error: error.message, code: error.code };
  }
};
