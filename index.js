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
    let nombres = ['cumbre borrascosas']
    return nombres
  }
}



const usuario = new Usuario ('Elon', 'Musk')

usuario.addMascotas('gato')
usuario.countMascotas()
usuario.addBook('cumbre borrascosas','Emily Bronte')
usuario.getbookNames()
console.log(usuario)