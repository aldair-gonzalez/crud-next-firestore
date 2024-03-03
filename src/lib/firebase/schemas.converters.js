import {
  Alumno,
  AlumnoAsistencia,
  AlumnoDeuda,
  AlumnoDeudaPago,
  Clase,
  Instrumento,
  Profesor,
  Rol,
  Usuario,
} from "./schemas";

export const RolConverter = {
  toFirestore: (rol) => {
    return {
      nombre: rol.nombre,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Rol({ nombre: data.nombre });
  },
};

export const InstrumentoConverter = {
  toFirestore: (instrumento) => {
    return {
      nombre: instrumento.nombre,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Instrumento({ nombre: data.nombre });
  },
};

export const UsuarioConverter = {
  toFirestore: (usuario) => {
    return {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      telefono: usuario.telefono,
      rol: usuario.rol,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Usuario({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      rol: data.rol,
    });
  },
};

export const ProfesorConverter = {
  toFirestore: (profesor) => {
    return {
      usuario: profesor.usuario,
      instrumentos: profesor.instrumentos,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Profesor({
      usuario: data.usuario,
      instrumentos: data.instrumentos,
    });
  },
};

export const ClaseConverter = {
  toFirestore: (clase) => {
    return {
      fecha: clase.fecha,
      hora_inicio: clase.hora_inicio,
      hora_fin: clase.hora_fin,
      profesor: clase.profesor,
      instrumento: clase.instrumento,
      status: clase.status,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Clase({
      fecha: data.fecha,
      hora_inicio: data.hora_inicio,
      hora_fin: data.hora_fin,
      profesor: data.profesor,
      instrumento: data.instrumento,
      status: data.status,
    });
  },
};

export const AlumnoConverter = {
  toFirestore: (alumno) => {
    return {
      usuario: alumno.usuario,
      profesor: alumno.profesor,
      instrumentos: alumno.instrumentos,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Alumno({
      usuario: data.usuario,
      profesor: data.profesor,
      instrumentos: data.instrumentos,
    });
  },
};

export const AlumnoAsistenciaConverter = {
  toFirestore: (asistencia) => {
    return {
      clase: asistencia.clase,
      status: asistencia.status,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new AlumnoAsistencia({
      clase: data.clase,
      status: data.status,
    });
  },
};

export const AlumnoDeudaConverter = {
  toFirestore: (deuda) => {
    return {
      fecha: deuda.fecha,
      monto_total: deuda.monto_total,
      status: deuda.status,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new AlumnoDeuda({
      fecha: data.fecha,
      monto_total: data.monto_total,
      status: data.status,
    });
  },
};

export const AlumnoDeudaPagoConverter = {
  toFirestore: (pago) => {
    return {
      fecha: pago.fecha,
      monto_pagado: pago.monto_pagado,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new AlumnoDeudaPago({
      fecha: data.fecha,
      monto_pagado: data.monto_pagado,
    });
  },
};
