import { collection, getDocs, getDoc, doc, query } from "firebase/firestore";
import { db } from "../firebase";

export const getAllInstrumentos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "instrumentos"));
    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    console.error("Error getting alumnos: ", error);
    return [];
  }
};

export const getInstrumentoById = async (id) => {
  try {
    const docRef = doc(db, "instrumentos", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    else throw new Error("Instrumento no encontrado");
  } catch (error) {
    console.error("Error getting instrumento: ", error);
    return null;
  }
};

export const getAllRoles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "roles"));
    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    console.error("Error getting roles: ", error);
    return [];
  }
};

export const getRolById = async (id) => {
  try {
    const docRef = doc(db, "roles", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    else throw new Error("Rol no encontrado");
  } catch (error) {
    console.error("Error getting rol: ", error);
    return null;
  }
};

export const getAllUsuarios = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const usuarios = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const usuarioData = doc.data();
        return { id: doc.id, ...usuarioData };
      })
    );
    return usuarios;
  } catch (error) {
    console.error("Error getting usuarios: ", error);
    return [];
  }
};

export const getUsuarioById = async (id) => {
  try {
    const docRef = doc(db, "usuarios", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    else throw new Error("Usuario no encontrado");
  } catch (error) {
    console.error("Error getting usuario: ", error);
    return null;
  }
};

export const getAllProfesores = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "profesores"));
    const profesores = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const profesorData = doc.data();
        return {
          id: doc.id,
          ...profesorData,
        };
      })
    );
    return profesores;
  } catch (error) {
    console.error("Error getting profesores: ", error);
    return [];
  }
};

export const getProfesorById = async (id) => {
  try {
    const docRef = doc(db, "profesores", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    else throw new Error("Profesor no encontrado");
  } catch (error) {
    console.error("Error getting profesor: ", error);
    return null;
  }
};

export const getAllAlumnos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "alumnos"));
    const alumnos = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const alumnoData = doc.data();
        return { id: doc.id, ...alumnoData };
      })
    );
    return alumnos;
  } catch (error) {
    console.error("Error getting alumnos: ", error);
    return [];
  }
};

export const getAlumnoById = async (id) => {
  try {
    const docRef = doc(db, "alumnos", id);
    const docSnap = await getDoc(docRef);
    const collectionDeudasRef = collection(db, `alumnos/${id}/deudas`);
    const queryDeudasSnap = await getDocs(collectionDeudasRef);
    const collectionAsistenciasRef = collection(db, `alumnos/${id}/asistencias`);
    const queryAsistenciasSnap = await getDocs(collectionAsistenciasRef);

    const deudas = queryDeudasSnap.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    })
    const asistencias = queryAsistenciasSnap.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    })

    if (docSnap.exists()) return {...docSnap.data(), deudas, asistencias};
    else throw new Error("Alumno no encontrado");
  } catch (error) {
    console.error("Error getting alumno: ", error);
    return null;
  }
}

export const getAllClases = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "clases"));
    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    console.error("Error getting clases: ", error);
    return [];
  }
};

export const getClaseById = async (id) => {
  try {
    const docRef = doc(db, "clases", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    else throw new Error("Clase no encontrada");
  } catch (error) {
    console.error("Error getting clase: ", error);
    return null;
  }
}