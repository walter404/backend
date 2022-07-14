class Usuario {

  constructor(nombre, apellido, mascotas, libros) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mascotas = mascotas;
    this.libros = libros;
  }

  getFullName() {
    return `Me llamo ${this.nombre} ${this.apellido}`
  }
  addMascotas() {
    return `${this.mascotas}, conejo `
  }

  countMascotas() {
    return `${this.mascotas.length} `
  }
  addBook() {
    return {
      nombre: 'cumbre borrascosas',
      autor: 'Emily Bronte'
    }
  }
  getBookNames() {
    return this.libros
  }
  getBook() {
    return [{
      nombre: 'El señor de las moscas'
    }, {
      nombre: 'Fundacion'
    }]
  }
}
let usuario = new Usuario(
  'elon',
  'musk',
  ['perro', 'gato'],
  [{
    nombre: 'El señor de las moscas',
    autor: 'William Golding'
  }, {
    nombre: 'Fundacion',
    autor: 'Isaac Asimov'
  }]
)

usuario.getFullName()