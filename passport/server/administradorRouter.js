const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const Users = require('./users')

const router = express.Router();
router.use(morgan('dev'))


///////////////////////////////////////////////

/////////////////////////////////////////////////

// index
router.get('/', (req, res) => {
    res.send('hola mundo')
})
router.get('/home', checkAuth,(req, res) => {
    res.render('profileUser',{user: req.user})
})

// login

router.get('/login', (req, res) => {

    // if (req.isAuthenticated()) {
    //     const { user } = req.user
    //     console.log('user logueado')
    //     res.render('profileUser')        
    // } else {
    //     console.log('user no logueado')
    //     res.render('login')
    // }
    res.render('login')
})


router.post('/api/login', passport.authenticate('login',{
    
}),(req, res) => {
    const { userId, pass } = req.body
    // const {user} = req.user

    console.log('eeee nada')
    res.json({respuesta:'alguna respuesta'})   

})

// signup

router.get('/signup', (req, res) => {
    res.render('signup')
})

// logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})
// fail route






module.exports = router