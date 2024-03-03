export class Rol {
  constructor({ nombre }) {
    this.nombre = nombre;
  }
}

export class Instrumento {
  constructor({ nombre }) {
    this.nombre = nombre;
  }
}

export class Usuario {
  constructor({ nombre, apellido, email, telefono, rol }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
    this.rol = rol;
  }
}

export class Profesor {
  constructor({ usuario, instrumentos }) {
    this.usuario = usuario;
    this.instrumentos = instrumentos;
  }
}

export class Clase {
  constructor({ fecha, hora_inicio, hora_fin, profesor, instrumento, status }) {
    this.fecha = fecha;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
    this.profesor = profesor;
    this.instrumento = instrumento;
    this.status = status;
  }
}

export class Alumno {
  constructor({ usuario, profesor, instrumentos }) {
    this.usuario = usuario;
    this.profesor = profesor;
    this.instrumentos = instrumentos;
  }
}

export class AlumnoAsistencia {
  constructor({ clase, status }) {
    this.clase = clase;
    this.status = status;
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
