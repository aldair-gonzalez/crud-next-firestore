import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { where } from 'firebase/firestore';
import { Instrumento } from "../models/instrumento.model";

export const createInstrumento = async (instrumento) => {
  try {
    const parseInstrumento = new Instrumento(instrumento)
    if (!parseInstrumento.nombre) throw new Error("El nombre del instrumento es obligatorio");
    const docRef = collection(db, "pruebas");
    const q = query(docRef, where("nombre", "==", parseInstrumento.nombre));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      if (doc.data().nombre == parseInstrumento.nombre) throw new Error("El instrumento ya existe")
    })

    const docSnap = await addDoc(docRef, parseInstrumento);
    if (docSnap) return {...parseInstrumento, id: docSnap.id}
    else throw new Error("Error al crear instrumento");
  } catch (error) {
    return { error: error.message }
  }
}