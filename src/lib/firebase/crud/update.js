import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export const updateInstrumento = async (id, data) => {
  try {
    const docRef = doc(db, "instrumentos", id)
    const docSnap = await updateDoc(docRef, data)
    return docSnap
  } catch (error) {
    console.log(error)
    return { error: error.message }
  }
}