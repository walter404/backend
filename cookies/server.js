import express  from "express";
import session from "express-session";
import {createClient} from 'redis'
import connectRedis from "connect-redis";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

const redisStore = connectRedis(session)

const redisClient = createClient({
    socket:{
        host: 'redis-14146.c265.us-east-1-2.ec2.cloud.redislabs.com',
        port: 14146,
    },
    password: 'dEZNpxNBKVMMJDvtniywBiG3GaZxIPC5',
    legacyMode:true     
})
redisClient.on('error', function (err) {
    console.log('no se puede establecer conexion con redis. ' + err);
})
redisClient.on('connect', function (ok) {
    console.log('se conecto redis');
});
redisClient.connect();
//Configuramos el middleware
app.use(session({
    store: new redisStore({ client: redisClient }),
    secret: 'dEZNpxNBKVMMJDvtniywBiG3GaZxIPC5',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: false, 
    }
}))
app.get('/', (req, res) => {
    const sess = req.session;
    if(sess.username && sess.password){
            res.write(`<h1>Bievenido ${sess.username} </h1><br>`)
            res.end('<a href=' + '/logout' + '>Cerrar Sesion</a >')
        
    }
    else {
        var currentPath = process.cwd();

        res.render( currentPath + "/views/login.ejs")
    }
})

app.post('/login', async (req,res) => {
    const sess = req.session;
    const { username, password } = req.body;
    sess.username = username;
    sess.password = password
    await res.redirect('/')
})
app.get('/logout',  (req,res) =>{
    req.session.destroy(err => {
        if(err) {
            return console.log(err)
        }
        res.redirect('/')
    })
})

const PORT = process.env.PORT || 3005
app.listen(PORT, ()=>{
    console.log(`escuchando el puerto ${PORT}`);
})

//password de usuario @wally2021