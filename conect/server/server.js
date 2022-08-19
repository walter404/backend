import express from "express";
import * as url from 'url';
import http from 'http';
import {Server} from 'socket.io'
import Contenedor from './Contenedor.js';
import cors from 'cors'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const productos = new Contenedor('./productos.json')
const comentarios = new Contenedor('./comentarios.json')


const app = express()  
app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", 'POST']
    }
})

io.on('connection', async (socket) =>{
    const listaComentarios = await comentarios.getAll()
    const listaProductos = await productos.getAll()

    socket.emit('comentarios', listaComentarios)
    socket.emit('productos', listaProductos )
    socket.on('producto', async (data) => {    
        await productos.save({producto: data.body.producto, precio: data.body.precio, thumbnail: data.body.thumbnail});
        const listaProductos = await comentarios.getAll() 
        console.log(listaComentarios)
        io.sockets.emit('productos', listaProductos)
    })
    socket.on('message', async (data) => {    
        await comentarios.save({nombre: data.body.nombre, titulo: data.body.titulo, comentario: data.body.comentario, fecha: new Date().toLocaleDateString('es-ar', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    });
        const listaComentarios = await comentarios.getAll() 
        io.sockets.emit('comentarios', listaComentarios)
    })
  
})

const port = process.env.PORT || 4000;
server.listen(port, () => {console.log('server is running on 4000')})
