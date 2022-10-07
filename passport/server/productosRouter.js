const express = require('express');
const Contenedor = require('./Contenedor.js');

const router = express.Router();
const productos = new Contenedor('./productos.json')


router.get('/api/productos', async (req, res) =>{
    const todosProductos = await productos.getAll();
    res.json(todosProductos)
});

router.get('/api/productos/:id', async (req, res)=> {
    const idReq = req.params.id
    const produtoId = await productos.getById(+idReq);
    res.json(produtoId);
})

router.post('/api/productos', async (req, res) => {
    const productoCreado = await productos.save(req.body);
    if (productoCreado > 0){
        res.json({
            ok: true,
            mensaje: 'El Post se agrego correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se agrego por que el objeto esta vacio',
            error: 'No se pudo enviar el post',
            id: productoCreado
        })
    }
})

// se puede hacer por postman con put, pero por el formulario se puede hacer unicamente por post ya que HTML soporta solo GET y POST
router.put('/api/productos/:id', async (req, res) => {
    console.log('DTCON req put', req)
    const productoCreado = await productos.saveById(req.body);
    if (productoCreado > 0){
        res.json({
            ok: true,
            mensaje: 'El Post se edito correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se pudo editar ',
            error: 'producto no encontrado',
            id: productoCreado
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////
// SI ENTRA A /editar/:id hay un cliente que se accede para modificar los datos
////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/api/productos/:id', async (req, res) => {
    const productoCreado = await productos.saveById(req.body);
    if (productoCreado > 0){
        res.json({
            ok: true,
            mensaje: 'El Post se edito correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se pudo editar ',
            error: 'producto no encontrado',
            id: productoCreado
        })
    }
})
// solo se puede acceder por POSTMAN
router.delete('/api/productos/:id', async (req, res) => {
    console.log('se borra')
    const productoCreado = await productos.deleteById(+req.params.id);
    if (productoCreado > 0){
        res.json({
            ok: true,
            mensaje: 'El Post se agrego correctamente',
            id: productoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'No se ejecuto el proceso',
            error: 'producto no encontrado',
            id: productoCreado
        })
    }
})

module.exports = router