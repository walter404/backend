const express = require('express')
const Contenedor = require('./contenedor')
const contenedor = new Contenedor('./productos.txt')
const app = express()



app.get('/productos', (req, res)=>{
    contenedor.getAll().then((productos)=>{
        res.send(productos)
    });
});

app.get('/productoRandom', (req, res)=>{
    contenedor.getAll().then((productos)=>{
        let randomProd = Math.floor(Math.random() * productos.length);
        let prod = productos[randomProd];
        res.send(prod);
    });
});


const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err=> console.log(err))