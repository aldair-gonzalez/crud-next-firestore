import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
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
      email: usuario.email,
      contrasena: usuario.contrasena,
      rol: usuario.rol
    }

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
    })

    const docSnap = await addDoc(docRef, setUser);
    if (docSnap) {
      const docProfesorSnap = await addDoc(docProfesorRef, {
        usuario: doc(db, `usuarios/${docSnap.id}`),
        instrumento: doc(db, `instrumentos/${usuario.instrumento}`),
      });

      return { ...usuario, id_usuario: docSnap.id, id_profesor: docProfesorSnap.id };
    }
  } catch (error) {
    return { error: error.message };
  }
};
