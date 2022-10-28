import {connect} from '../../contenedor/contenedorMongo.js'

class ProductosDaoArchivos {

    constructor (db) {
        this.db = connect().productosModel;
    }
   
    async save(obj){
        try{
            if(obj.producto && obj.precio && obj.thumbnail){
                let carritos =  await this.db.create({
                    producto: obj.producto,
                    precio: obj.precio,
                    thumbnail: obj.thumbnail
                });
                carritos.save();
                return carritos
            }else{
                return {error: "no tiene elementos"}
            }
        }catch(error){
            console.warm('hay un error ', error)
            return {error: error.message}
        }
    }
    async getById(id){
        try{
            let getall =  await this.db.find({_id: id})
            return getall; 
        }catch(error){
            return {error: error.message}
        }
    }
    async getAll(){
        try{
            let getall =  await this.db.find({})
            return getall; 
        }catch(error){
            return {error: error.message}
        }
    }
    async updateById(id, obj) {
        try{
            if(obj.producto && obj.precio && obj.thumbnail){
                let carritos =  await this.db.findOneAndUpdate(
                    {_id: id},
                    {
                    producto: obj.producto,
                    precio: obj.precio,
                    thumbnail: obj.thumbnail
                });
                carritos.save();
                return carritos
            }else{
                return {error: "no tiene elementos"}
            }
        }catch(error){
            console.warm('hay un error ', error)
            return {error: error.message}
        }
    }
    async deleteById(id){
        try{
            let getall =  await this.db.deleteOne({ _id: id });
            return getall; 
        }catch(error){
            return {error: error.message}
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.archivo, '[]' ,'utf8')   
        } catch (error) {
            console.error('El archivo no se pudo grabar ', error)

        }
    }
}

export default ProductosDaoArchivos;
