import * as dotenv from 'dotenv'
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import express from "express";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session"
import User from "./User.js";
import { ProductosMongoRouter } from "./productosMongoRouter.js";
import {carritoMongoRouter} from "./carritosMongoRouter.js";
import {RandomRouter} from './RandomRouter.js'
dotenv.config()

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
      res.send(info);
})
app.listen(8080, () => {
    console.log('server corriendo')
})