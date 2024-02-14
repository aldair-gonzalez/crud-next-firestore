import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { where } from "firebase/firestore";

export const createInstrumento = async (instrumento) => {
  try {
    instrumento.nombre = instrumento.nombre.trim();
    instrumento.nombre = instrumento.nombre.toLowerCase();

    if (!instrumento.nombre)
      throw new Error("El nombre del instrumento es obligatorio");
    const docRef = collection(db, "pruebas");
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
    console.log(error);
    return { error: error.message };
  }
};
