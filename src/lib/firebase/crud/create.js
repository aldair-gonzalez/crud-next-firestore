import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { where } from "firebase/firestore";

import { Clase, Instrumento } from "../schemas";
import { ClaseConverter, InstrumentoConverter } from "../schemas.converters";

export const createInstrumento = async (instrumento) => {
  try {
    const setInstrumento = new Instrumento({ nombre: instrumento.nombre });
    if (!setInstrumento.nombre) {
      throw new Error("El nombre del instrumento es obligatorio");
    }
    const docRef = collection(db, "instrumentos").withConverter(
      InstrumentoConverter
    );
    const q = query(docRef, where("nombre", "==", setInstrumento.nombre));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().nombre == instrumento.nombre)
        throw new Error("El instrumento ya existe");
    });

    const docSnap = await addDoc(docRef, setInstrumento);
    if (docSnap) {
      return { ...instrumento, id: docSnap.id };
    } else {
      throw new Error("Error al crear instrumento");
    }
  } catch (error) {
    return { error: error.message };
  }
};

export const createClase = async (clase) => {
  try {
    const setClase = new Clase({
      fecha: clase.fecha,
      hora_inicio: clase.hora_inicio,
      hora_fin: clase.hora_fin,
      profesor: clase.profesor,
      instrumento: clase.instrumento,
      status: clase.status,
    });

    const docRef = collection(db, "clases").withConverter(ClaseConverter);
    const docSnap = await addDoc(docRef, setClase);

    if (docSnap) {
      return { ...clase, id: docSnap.id };
    } else {
      throw new Error("Error al crear clase");
    }
  } catch (error) {
    return { error: error.message };
  }
};
