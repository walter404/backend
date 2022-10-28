import * as dotenv from 'dotenv'
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import express from "express";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import {createLogger, transports, format  }  from 'winston';
import cluster from 'cluster';
import {cpus} from 'os';
import isPrime from './isPrime.js';
import User from "./User.js";
import { ProductosMongoRouter } from "./productosMongoRouter.js";
import {carritoMongoRouter} from "./carritosMongoRouter.js";
import {RandomRouter} from './RandomRouter.js'
dotenv.config()

const PORT = parseInt(process.argv[2]) || 8080
const modoCluster = process.argv[3] == 'CLUSTER'

const logger = createLogger({
    level: 'warn',
    format: combine(
        colorize({ all: true }),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
        ),
        transports : [
            new transports.Console({level: 'verbose'}),
            new transports.File({filename: './logs/warn.log', level: 'warn'}),
        new transports.File({filename: './logs/error.log', level: 'error'}) 
    ]
})


if(modoCluster && cluster.isPrimary){
    const numCPUs = cpus.length;
    logger.warn(`numero de procesadores: ${numCPUs}`)
    logger.warn(`PID Master ${process.pid} `)
    for (let i = 0; i < numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, ' died', new Date().toLocaleString() )
    })
} else {
    const app = express ();
    app.get('/', (req,res)=> {
        const primes = []
        const max = Number(req.query.max) || 1000;
        for (let i = 1; i <= max; i++){
            if(isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })
}

const LocalStrategy = passportLocal.Strategy
const url = process.env.MONGO_URI;
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    console.log('mongodb conectado')
})
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(
    session({
        secret:"secretcode",
        resave: true,
        saveUninitialized: true
    })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(ProductosMongoRouter)
app.use(carritoMongoRouter)
app.use(RandomRouter)
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
passport.serializeUser((user, cb)=>{
    cb(null, user.id)
})
passport.deserializeUser((id,cb)=>{
    User.findOne({_id: id}, (err, usr)=>{
        const userInformation = {
            userId: usr.userId,
            isAdmin: usr.isAdmin
        };
        cb(null, userInformation)
    });
});
app.post('/api/signup', async (req, res) => {
    const {userId, pass} = req?.body
    if(!userId || !pass  ) {
        res.send("los valores no son validos")
        return;
    }
    User.findOne({userId}, async (err, usr)=>{
        if(err) throw err;
        if(usr) res.send('el usuairo ya existe')
        if(!usr) {
            const hashed = await bcrypt.hash(pass, 10);
            const newUser = new User({
                userId,
                pass: hashed
            })
            await newUser.save();

            res.send('exito en guardar!')
        }
    })
})
app.post('/api/login',passport.authenticate('local'), (req, res) => {
    console.log(req.body.pass, req.body.userId)
    res.send({user: req?.user.userId, isAdmin: req?.user.isAdmin })
})
app.get('/api/user', (req,res) => {
    res.send(req?.user);
})
app.get('/api/logout', (req,res) => {
    req.logout();
    res.send("deslogueado");
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
      logger.warn(info)   
      res.send(info);
})

app.get("/newUser", (req, res) => {
    console.log('algo no?')
    let username = req.query.username || "";
    const password = req.query.password || "";

    username = username.replace(/[!@#$%^&*]/g, "");

    if (!username || !password || users[username]) {
        return res.sendStatus(400);
    }

    const salt = crypto.randomBytes(128).toString("base64");
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

    users[username] = { salt, hash };

    res.sendStatus(200);
})

app.get("/auth-bloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
  
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || !users[username]) {
      process.exit(1)
      // return res.sendStatus(400);
    }
  
    const { salt, hash } = users[username];
    const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
  
    if (crypto.timingSafeEqual(hash, encryptHash)) {
      res.sendStatus(200);
    } else {
      process.exit(1)
      // res.sendStatus(401);
    }
})

app.get("/auth-nobloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || !users[username]) {
      process.exit(1)
      // return res.sendStatus(400);
    }
    crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
      if (users[username].hash.toString() === hash.toString()) {
        res.sendStatus(200);
      } else {
        process.exit(1)
        //res.sendStatus(401);
      }
    });
});

app.listen(PORT, () => {
    console.log('server corriendo en', PORT)
    console.log('pid worker ', process.pid)

})