class Usuario {

  constructor(nombre, apellido, mascotas, libros) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mascotas = [];
    this.libros = [];
  }

  getFullName() {
    return `Me llamo ${this.nombre} ${this.apellido}`
  }
  addMascotas(conejo) {
    this.mascotas.push(conejo);
  }
  countMascotas() {
    return `${this.mascotas.length} `
  }
  addBook(nombre,autor){
    this.libros.push(nombre,autor)
  }
  getbookNames(){
    return this.libros.map(e=>e.nombre)
  }
}



const usuario = new Usuario ('Elon', 'Musk')

usuario.getFullName()
usuario.addMascotas('gato')
usuario.addMascotas('perro')
usuario.countMascotas()
usuario.addBook('cumbre borrascosas','Emily Bronte')
usuario.addBook('cumbre borrascosas 2','Emily Bronte')
usuario.getbookNames()