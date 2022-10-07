const fs = require( 'fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }
    async #readFile() {
        let productos = [];
        let productosJson;
        try {
            productos = await fs.promises.readFile(this.archivo, 'utf-8');
        } catch (error) {
            console.error('No se encontro el archivo', this.archivo)
        }
        if (productos === '') productos = '[]';
        productosJson = JSON.parse(productos);
        return productosJson;
    }
    async getLenght() {
        const productosJson = await this.#readFile();
        return productosJson.length;
    }
    async save(obj) {
        const productosJson = await this.#readFile();
        const ids = productosJson.map(obj => obj.id);
        let id = Math.max(...ids) + 1;
        if (Object.keys(obj).length !== 0) {
            if(obj.precio === '' && obj.producto === '') return -1
            try {
                if (productosJson.length > 0) {
                    await fs.promises.writeFile(this.archivo, JSON.stringify([{ ...obj, id }, ...productosJson], null, 2), 'utf8')
                    return id;
                } else {
                    await fs.promises.writeFile(this.archivo, JSON.stringify([{ ...obj, "id": 1 }], null, 2), 'utf8')
                    return 1;
                }
            } catch (error) {
                console.error('El archivo no se pudo grabar')
            }c
        } else {
            console.warn('No hay objeto para crear')
            return -1;
        }


    }
    async saveById(obj) {
        const productosJson = await this.#readFile();
        const productoIndex = productosJson.findIndex(producto => parseInt(producto.id) === parseInt(obj.id));
        productosJson[productoIndex] = obj;
        if (productosJson.length > 0) {
            await fs.promises.writeFile(this.archivo, JSON.stringify([...productosJson], null, 2), 'utf8')
            return obj.id;
        }else {
            return productoIndex;
        }

    }
    async getById(id) {
        const productosJson = await this.#readFile();
        const productoId = productosJson.find(producto => parseInt(producto.id) === parseInt(id));
        if (productoId) {
            console.log(productoId)
            return productoId;
        } else {
            console.warn("No hay producto con ese ID")
            return null;
        }
    }
    async getByUserId(idUsuario) {
        const productosJson = await this.#readFile();
        const productoId = productosJson.filter(producto => parseInt(producto.idUsuario) === parseInt(idUsuario));
        if (productoId) {
            console.log('producto check',productoId)
            return productoId;
        } else {
            console.warn("El usuario no tiene productos")
            return null;
        }
    }
    async getAll() {
        const productosJson = await this.#readFile();
        if (productosJson !== []) {
            return productosJson;
        } else {
            console.warn("No hay productos")
            return null;
        }
    }
    async deleteById(id) {
        console.log('dale',id)
        const productosJson = await this.#readFile();
        const productoNuevo = productosJson.filter(producto => parseInt(producto.id) !== parseInt(id));
        console.log('productos', productoNuevo, productosJson)
        if (productoNuevo) {
            try {
                await fs.promises.writeFile(this.archivo, JSON.stringify([...productoNuevo], null, 2), 'utf8')
                console.log(productoNuevo)
            } catch (error) {
                console.error("Fallo al grabar ", error)
            }
        } else {
            console.warn("No existe ese Id para borrar")
        }
    }
    async deleteByUserAndIdProducto(idProducto, idUsuario) {
        const productosJson = await this.#readFile();
        const productoNuevo = productosJson.filter(producto =>   +producto.idProducto !== +idProducto);
        console.log('productos', productoNuevo, productosJson)
        if (productoNuevo) {
            try {
                await fs.promises.writeFile(this.archivo, JSON.stringify([...productoNuevo], null, 2), 'utf8')
                console.log(productoNuevo)
            } catch (error) {
                console.error("Fallo al grabar ", error)
            }
        } else {
            console.warn("No existe ese Id para borrar")
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo, '[]', 'utf8')
        } catch (error) {
            console.error('El archivo no se pudo grabar ', error)

        }
    }
}
module.exports = Contenedor;