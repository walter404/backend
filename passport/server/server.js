const express = require('express');
const cors = require('cors')
const http = require('http');
const httpServer = require("http").createServer();
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Contenedor = require('./Contenedor.js');
const produtosRouter = require('./productosRouter.js');
const carroRouter = require("./carroRouter.js");

const productos = new Contenedor('./productos.json')
const comentarios = new Contenedor('./comentarios.json')
const morgan = require('morgan')

const app = express()   
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(produtosRouter)
app.use(carroRouter)
app.use(morgan('dev'))

const server = http.createServer(app);
const io = require("socket.io")(httpServer, {
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
        io.sockets.emit('productos', listaProductos)
    })
    socket.on('message', async (data) => {    
        await comentarios.save({nombre: data.body.nombre, titulo: data.body.titulo, comentario: data.body.comentario, fecha: new Date().toLocaleDateString('es-ar', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    });
        const listaComentarios = await comentarios.getAll() 
        io.sockets.emit('comentarios', listaComentarios)
    })
  
})

app.use(session({
    secret: 'secret',
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7

    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())



/////////// utils /////////

const isValidePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}


const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }else{
        res.redirect('/login')
    }
    

}
////////// PASSPORT  midelware //////////

passport.use('login', new LocalStrategy(
    function(pass, userId, done) {      
         return done(null, userId);
    }
  ));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    let user = Users.find( user => user.username === username )
    const { name, email } = req.body

    if (user) {
        console.log(`El usuario ${username} ya existe`)
        return done(null, false, { message: 'User already exists' })
    }

    let newUser = {
        id: Users.length + 1,
        username,
        // password: createHash(password),
        password,
        name,
        email
    }

    Users.push(newUser)

    return done(null, newUser.id)

}))
//////////////////   passport serialize   ///////

passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser((id, done) => {
    let user = Users.find( user => user.id === id )

    done(null, user)
})


app.post("/api/login", passport.authenticate("login",{successRedirect: '/api/productos'}),
    (req, res) => {
        res.send('algo')
    }       
  );

// signup

app.get('/signup', (req, res) => {
    res.render('signup')
})

// logout
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})
server.listen(4000, () => {console.log('server is running on 4000')})