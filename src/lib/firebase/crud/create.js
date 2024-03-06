import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

import {
  AlumnoAsistencia,
  AlumnoDeuda,
  AlumnoDeudaPago,
  Clase,
  Instrumento,
} from "../schemas";
import {
  AlumnoAsistenciaConverter,
  AlumnoDeudaConverter,
  AlumnoDeudaPagoConverter,
  ClaseConverter,
  InstrumentoConverter,
} from "../schemas.converters";

export const createInstrumento = async ({ nombre }) => {
  try {
    const setInstrumento = new Instrumento({ nombre });
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
      return { ...setInstrumento, id: docSnap.id };
    } else {
      throw new Error("Error al crear instrumento");
    }
  } catch (error) {
    return { error: error.message };
  }
};

export const createClase = async ({
  fecha,
  hora_inicio,
  hora_fin,
  profesor,
  instrumento,
  status,
}) => {
  try {
    const setClase = new Clase({
      fecha,
      hora_inicio,
      hora_fin,
      profesor,
      instrumento,
      status,
    });

    const docRef = collection(db, "clases").withConverter(ClaseConverter);
    const docSnap = await addDoc(docRef, setClase);

    if (docSnap) {
      return { ...setClase, id: docSnap.id };
    } else {
      throw new Error("Error al crear clase");
    }
  } catch (error) {
    return { error: error.message };
  }
};

export const createAlumnoAsistencia = async ({ alumnoId, clase, status }) => {
  try {
    const setAsistencia = new AlumnoAsistencia({
      clase: clase,
      status: status,
    });

    const docRef = collection(
      db,
      `alumnos/${alumnoId}/asistencias`
    ).withConverter(AlumnoAsistenciaConverter);
    const docSnap = await addDoc(docRef, setAsistencia);

    if (docSnap) {
      return { ...setAsistencia, id: docSnap.id };
    } else {
      throw new Error("Error al crear asistencia");
    }
  } catch (error) {
    return { error: error.message };
  }
};

export const createAlumnoDeuda = async ({
  alumnoId,
  fecha,
  monto_total,
  status,
}) => {
  try {
    const setDeuda = new AlumnoDeuda({
      fecha,
      monto_total,
      status,
    });

    const docRef = collection(db, `alumnos/${alumnoId}/deudas`).withConverter(
      AlumnoDeudaConverter
    );
    const docSnap = await addDoc(docRef, setDeuda);

    if (docSnap) {
      return { ...setDeuda, id: docSnap.id };
    } else {
      throw new Error("Error al crear deuda");
    }
  } catch (error) {
    return { error: error.message };
  }
};

export const createAlumnoDeudaPago = async ({
  alumnoId,
  deudaId,
  fecha,
  monto_pagado,
}) => {
  try {
    const setPago = new AlumnoDeudaPago({
      fecha,
      monto_pagado,
    });

    const docRef = collection(
      db,
      `alumnos/${alumnoId}/deudas/${deudaId}/pagos`
    ).withConverter(AlumnoDeudaPagoConverter);
    const docSnap = await addDoc(docRef, setPago);

    if (docSnap) {
      return { ...setPago, id: docSnap.id };
    } else {
      throw new Error("Error al crear pago");
    }
  } catch (error) {
    return { error: error.message };
  }
};
