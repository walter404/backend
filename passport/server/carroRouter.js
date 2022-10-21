import express from 'express';
import Contenedor from './daos/carritos/carritosDaoMongo.js';

const router = express.Router();
const objCarrito = new Contenedor()
router.get('/api/carro', async (req, res) =>{
    const todosCarritos = await objCarrito.getAll();
    if (!todosCarritos?.error){
        res.json({
            ok: true,
            mensaje: 'se leen todos los post correctamente',
            carro: todosCarritos
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'fallo la lectura',
            error: todosCarritos.error,
        })
    }
});

router.get('/api/carro/:id', async (req, res)=> {
    const idReq = req.params.id
    const carritoId = await objCarrito.getById(idReq);
    res.send(carritoId);
})

router.post('/api/carro', async (req, res) => {
    const carritoCreado = await objCarrito.save(req.body);
    if (!carritoCreado?.error){
        res.json({
            ok: true,
            mensaje: 'El Post se agrego correctamente',
            id: carritoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se agrego por que el objeto esta vacio',
            error: carritoCreado?.error,
        })
    }
})

router.put('/api/carro/:id', async (req, res) => {
    const carritoCreado = await objCarrito.updateById(req.params.id, req.body);
    if (!carritoCreado?.error){
        res.json({
            ok: true,
            mensaje: 'El Post se edito correctamente',
            id: carritoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se pudo editar ',
            error: carritoCreado?.error,
        })
    }
})

router.delete('/api/carro/:id', async (req, res) => {
    console.log('se borra')
    const carritoCreado = await objCarrito.deleteById(req.params.id);
    if (!carritoCreado?.error){
        res.json({
            ok: true,
            mensaje: 'El Post se borro correctamente',
            id: carritoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'No se ejecuto el proceso',
            error: carritoCreado?.error,
        })
    }
})

export {router as carritoMongoRouter}