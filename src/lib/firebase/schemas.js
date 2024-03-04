import { doc } from "firebase/firestore";
import { db } from "./firebase";

const Utils = {
  toTrimLowercase(string) {
    return string.trim().toLowerCase();
  },
  toTrimUppercase(string) {
    return string.trim().toUpperCase();
  },
  toTrim(string) {
    return string.trim();
  },
};

export class Rol {
  constructor({ nombre }) {
    this.nombre = nombre;
  }
}

export class Instrumento {
  constructor({ nombre }) {
    this.nombre = Utils.toTrimLowercase(nombre);
  }
}

export class Usuario {
  constructor({ nombre, apellido, email, telefono, rol }) {
    this.full_name = this.parseFullName({ nombre, apellido });
    this.email = Utils.toTrim(email);
    this.telefono = Utils.toTrim(telefono);
    this.rol = this.parseRolRef({ rol });
  }

  parseFullName({ nombre, apellido }) {
    nombre = Utils.toTrim(nombre);
    apellido = Utils.toTrim(apellido);
    return { nombre, apellido };
  }

  parseRolRef({ rol }) {
    return doc(db, "roles", rol.id);
  }
}

export class Profesor {
  constructor({ usuario, instrumentos }) {
    this.usuario = this.parseUsuarioRef(usuario);
    this.instrumentos = this.parseInstrumentosRef({ instrumentos });
  }

  parseUsuarioRef({ usuario }) {
    return doc(db, "usuarios", usuario.id);
  }

  parseInstrumentosRef({ instrumentos }) {
    return instrumentos.map((instrumento) => {
      return doc(db, "instrumentos", instrumento.id);
    });
  }
}

export class Clase {
  constructor({ fecha, hora_inicio, hora_fin, profesor, instrumento, status }) {
    this.fecha = fecha;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
    this.profesor = this.parseProfesorRef({ profesor });
    this.instrumento = this.parseInstrumentoRef({ instrumento });
    this.status = status;
  }

  parseProfesorRef({ profesor }) {
    return doc(db, "profesores", profesor.id);
  }

  parseInstrumentoRef({ instrumento }) {
    return doc(db, "instrumentos", instrumento.id);
  }
}

export class Alumno {
  constructor({ usuario, profesor, instrumentos }) {
    this.usuario = this.parseUsuarioRef({ usuario });
    this.profesor = this.parseProfesorRef({ profesor });
    this.instrumentos = this.parseInstrumentosRef({ instrumentos });
  }

  parseUsuarioRef({ usuario }) {
    return doc(db, "usuarios", usuario.id);
  }

  parseProfesorRef({ profesor }) {
    return doc(db, "profesores", profesor.id);
  }

  parseInstrumentosRef({ instrumentos }) {
    return instrumentos.map((instrumento) => {
      return doc(db, "instrumentos", instrumento.id);
    });
  }
}

export class AlumnoAsistencia {
  constructor({ clase, status }) {
    this.clase = this.parseClaseRef({ clase });
    this.status = status;
  }

  parseClaseRef({ clase }) {
    return doc(db, "clases", clase.id);
  }
}

export class AlumnoDeuda {
  constructor({ fecha, monto_total, status }) {
    this.fecha = fecha;
    this.monto_total = monto_total;
    this.status = status;
  }
}

export class AlumnoDeudaPago {
  constructor({ fecha, monto_pagado }) {
    this.fecha = fecha;
    this.monto_pagado = monto_pagado;
  }
}
