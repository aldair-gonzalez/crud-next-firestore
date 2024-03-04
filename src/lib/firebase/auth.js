import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut as signOutFirebase,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "./firebase";
import {
  AlumnoConverter,
  ProfesorConverter,
  UsuarioConverter,
} from "./schemas.converters";
import { Alumno, Profesor, Usuario } from "./schemas";

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

export const signUp = async ({
  email,
  password,
  sendEmail,
  rolAsignado,
  ...rest
}) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = createdUser.user;

    await fetch("api/auth/custom-rol", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-uid": firebaseUser.uid,
        "x-rol": rolAsignado.nombre,
      },
    });

    const setUsuario = new Usuario({
      nombre: rest.nombre,
      apellido: rest.apellido,
      telefono: rest.telefono,
      rol: rolAsignado,
      email,
    });

    const usuarioRef = doc(db, "usuarios", firebaseUser.uid).withConverter(
      UsuarioConverter
    );

    await setDoc(usuarioRef, setUsuario);

    switch (rolAsignado.nombre) {
      case "profesor":
        const setProfesor = new Profesor({
          instrumentos: rest.instrumentosId,
          usuario: firebaseUser.uid,
        });
        const profesorRef = doc(
          db,
          "profesores",
          firebaseUser.uid
        ).withConverter(ProfesorConverter);
        await setDoc(profesorRef, setProfesor);
        break;
      case "alumno":
        const setAlumno = new Alumno({
          usuarioUid: firebaseUser.uid,
          profesorId: rest.profesorId,
          instrumentosId: rest.instrumentosId,
        });
        const alumnoRef = doc(db, "alumnos", firebaseUser.uid).withConverter(
          AlumnoConverter
        );
        await setDoc(alumnoRef, setAlumno);
        break;
      default:
        return;
    }

    // let collection;
    // let additionalData = {};
    // switch (rolAsignado.nombre) {
    //   case "profesor":
    //     collection = "profesores";
    //     const instrumento = rest?.instrumento;
    //     additionalData = {
    //       instrumento: doc(db, "instrumentos", instrumento),
    //     };
    //     break;
    //   case "alumno":
    //     collection = "alumnos";
    //     const profesor = rest?.profesor;
    //     additionalData = { profesor: doc(db, "profesores", profesor) };
    //     break;
    //   default:
    //     return;
    // }

    // await setDoc(doc(db, collection, firebaseUser.uid), {
    //   usuario: doc(db, "usuarios", firebaseUser.uid),
    //   ...additionalData,
    // });

    sendEmail && (await sendEmailVerification(firebaseUser));
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await signOutFirebase(auth);
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
