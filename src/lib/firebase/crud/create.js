import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { where } from "firebase/firestore";

export const createInstrumento = async (instrumento) => {
  try {
    instrumento.nombre = instrumento.nombre.trim();
    instrumento.nombre = instrumento.nombre.toLowerCase();

    if (!instrumento.nombre)
      throw new Error("El nombre del instrumento es obligatorio");
    const docRef = collection(db, "instrumentos");
    const q = query(docRef, where("nombre", "==", instrumento.nombre));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().nombre == instrumento.nombre)
        throw new Error("El instrumento ya existe");
    });

    const docSnap = await addDoc(docRef, instrumento);
    if (docSnap) return { ...instrumento, id: docSnap.id };
    else throw new Error("Error al crear instrumento");
  } catch (error) {
    return { error: error.message };
  }
};

export const createProfesor = async (usuario) => {
  try {
    const setUser = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
      email: usuario.email
    };

    const docRef = collection(db, "usuarios");
    const docProfesorRef = collection(db, "profesores");

    // Verificar que el usuario no exista
    const q = query(docRef, where("email", "==", usuario.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().email == usuario.email)
        throw new Error("El usuario ya existe");
    });

    const rolRef = collection(db, "roles");

    // Asignar el rol del profesor al usuario.
    const rolQ = query(rolRef, where("nombre", "==", "profesor"));
    const rolQuerySnapshot = await getDocs(rolQ);
    rolQuerySnapshot.forEach((data) => {
      setUser.rol = doc(db, `roles/${data.id}`);
    });

    const docSnap = await addDoc(docRef, setUser);
    if (docSnap) {
      const docProfesorSnap = await addDoc(docProfesorRef, {
        usuario: doc(db, `usuarios/${docSnap.id}`),
        instrumento: doc(db, `instrumentos/${usuario.instrumento}`),
      });

      return {
        ...usuario,
        id_usuario: docSnap.id,
        id_profesor: docProfesorSnap.id,
      };
    }
  } catch (error) {
    return { error: error.message };
  }
};

export const createAlumno = async (usuario) => {
  try {
    const setUser = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
      email: usuario.email,
      profesor: usuario.profesor,
    };

    const docRef = collection(db, "usuarios");
    const docAlumnoRef = collection(db, "alumnos");

    // Verificar que el usuario no exista
    const q = query(docRef, where("email", "==", usuario.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().email == usuario.email)
        throw new Error("El usuario ya existe");
    });

    const rolRef = collection(db, "roles");

    // Asignar el rol del alumno al usuario.
    const rolQ = query(rolRef, where("nombre", "==", "alumno"));
    const rolQuerySnapshot = await getDocs(rolQ);
    rolQuerySnapshot.forEach((data) => {
      setUser.rol = doc(db, `roles/${data.id}`);
    });

    const docSnap = await addDoc(docRef, setUser);
    if (docSnap) {
      const docAlumnoSnap = await addDoc(docAlumnoRef, {
        profesor: doc(db, `profesores/${usuario.profesor}`),
        usuario: doc(db, `usuarios/${docSnap.id}`),
      });

      return {
        ...usuario,
        id_usuario: docSnap.id,
        id_alumno: docAlumnoSnap.id,
      };
    }
  } catch (error) {
    return { error: error.message };
  }
};

export const createClase = async (clase) => {
  try {
    clase.profesor = doc(db, `profesores/${clase.profesor}`);
    clase.fecha = Timestamp.fromDate(new Date(clase.fecha));
    const docRef = collection(db, "clases");
    const docSnap = await addDoc(docRef, clase);
    if (docSnap) return { ...clase, id: docSnap.id };
    else throw new Error("Error al crear clase");
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
