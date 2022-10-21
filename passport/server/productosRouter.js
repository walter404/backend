import express from 'express';
import Contenedor from './daos/productos/productosDaoMongo.js';

const router = express.Router();
const objProducto = new Contenedor()
router.get('/api/productos', async (req, res) =>{
    const todosProductos = await objProducto.getAll();
    if (!todosProductos?.error){
        res.json({
            ok: true,
            mensaje: 'se leen todos los post correctamente',
            productos: todosProductos
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'fallo la lectura',
            error: todosProductos.error,
        })
    }
});

router.get('/api/productos/:id', async (req, res)=> {
    const idReq = req.params.id
    const produtoId = await objProducto.getById(idReq);
    res.send(produtoId);
})

router.post('/api/productos', async (req, res) => {
    const productoCreado = await objProducto.save(req.body);
    if (!productoCreado?.error){
        res.json({
            ok: true,
            mensaje: 'El Post se agrego correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se agrego por que el objeto esta vacio',
            error: productoCreado?.error,
        })
    }
})

router.put('/api/productos/:id', async (req, res) => {
    const productoCreado = await objProducto.updateById(req.params.id, req.body);
    if (!productoCreado?.error){
        res.json({
            ok: true,
            mensaje: 'El Post se edito correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se pudo editar ',
            error: productoCreado?.error,
        })
    }
})

router.delete('/api/productos/:id', async (req, res) => {
    console.log('se borra')
    const productoCreado = await objProducto.deleteById(req.params.id);
    if (!productoCreado?.error){
        res.json({
            ok: true,
            mensaje: 'El Post se borro correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'No se ejecuto el proceso',
            error: productoCreado?.error,
        })
    }
})

export {router as ProductosMongoRouter}