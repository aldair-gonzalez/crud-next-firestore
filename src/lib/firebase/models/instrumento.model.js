export class Instrumento {
  constructor({ nombre }) {
    this.nombre = (() => {
      nombre = String(nombre)
      nombre = nombre.trim()
      nombre = nombre.toLowerCase()
      return nombre
    })()
  }
}
