const fs = require('fs')
 
class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    }
    
    async save(obj){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse,{...obj, id: dataArchParse[dataArchParse.length - 1].id + 1 }], null, 2))
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj, id: 1 }], null, 2))
            }
            console.log(`El archivo tiene el id: ${dataArchParse.length + 1}`)
            
        } catch (error) {
            console.log(error)
        }
    }
    //traer producto por id
    async getById(id){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto) {
                console.log(producto)
            } else {
                console.log('No se encontro el producto')
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Traer todo los productos
    async getAll(){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.length){
                console.log(dataArchParse)
            } else{
                console.log('No hay producto')
            }
        } catch (error) {
            console.log(error)
        }
    }
    //Eliminar por id
    async delete(id){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto) {
                let dataArchParseFiltrado = dataArchParse.filter(producto=> producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf8')
                console.log('Producto Eliminado')
            } else {
                console.log('No existe producto')
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Eliminar todos los productos
    async deleteAll(){
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null,2), 'utf8')
    }
}

module.exports = Contenedor;