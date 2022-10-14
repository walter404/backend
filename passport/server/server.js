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

const {RandomRouter} = require('./RandomRouter')
dotenv.config()

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

  passport.use( new LocalStrategy( {
    usernameField: 'userId',
    passwordField: 'pass'
},(userId, pass, done) =>{
        User.findOne({userId}, async (err, usr)=>{
            if(err) throw err;
            if(!usr) done(null, false);
            bcrypt.compare(pass, usr.pass, (err, result)=>{
                if(err) throw err
                if(result) {
                    return done(null, usr)
                }else{
                    return done(null, false)
                }
            })          
        })   
    }
))
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

app.get('/api/info', (req,res)=>{
    const info = {
        path: process.cwd(),
        processId: process.pid,
        nodeVersion: process.version,
        title: process.tittle,
        system: process.platform,
        memory: process.memoryUsage.rss(),
      };   
      res.send(info);
})

server.listen(4000, () => {console.log('server is running on 4000')})