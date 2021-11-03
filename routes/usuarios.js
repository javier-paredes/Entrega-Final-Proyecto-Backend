require('dotenv').config();
// const config = require('../config')
const path = require('path')
const express = require('express');
require('../accounts/usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const jwtSecret = process.env.JWT_SECRET // config.JWT_SECRET
const passport = require('passport');
const Ethereal = require('../mensajeria/emailEthereal')
const productos = require('../api/productosMongo')
const carrito = require('../api/carritoMongo');
const User = require('../models/usuarios')

const routerUsuarios = express.Router();

// DATOS DE USUARIO

routerUsuarios.get('/', checkAuthentication, async (req, res) => {
    if (req.isAuthenticated()) {
        var user = req.user;
        let usuario = await User.findOne({ 'email': user.data.username })
        let listaProductos = await productos.listar()
        let vistaCarrito = await carrito.listar()
        res.render('vista', { showLogin: false, showContent: true, bienvenida: usuario.nombre, listaProductos: listaProductos, vistaCarrito: vistaCarrito, showBienvenida: true })
    } else {
        res.redirect('/login')
    }

})

// REGISTRO
routerUsuarios.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/users')
    } else {
        res.render('register', {})
    }
})

routerUsuarios.post('/register', passport.authenticate('signup', { failureRedirect: '/users/failsignup' }), async (req, res) => {
    let usuario = req.body
    usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null);
    let token = jwt.sign({ data: usuario }, jwtSecret, { expiresIn: '30m' })
    usuario.token = token
    Ethereal.mailAdminRegistro(usuario)
    res.cookie("token", token).redirect('/users')
})

routerUsuarios.get('/failsignup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/failSignup.html'))
})

//LOGIN
routerUsuarios.get('/login', async (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/users')
    }
    else {
        res.render('vista', { showLogin: true, showContent: false, showBienvenida: false });
    }
})

routerUsuarios.post('/login', passport.authenticate('login', { failureRedirect: '/users/faillogin' }), async (req, res) => {

    let usuario = req.body
    usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null);
    let token = jwt.sign({ data: usuario }, jwtSecret, { expiresIn: '30m' })
    usuario.token = token

    res.cookie("token", token).redirect('/users')
});

routerUsuarios.get('/faillogin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/failLogin.html'))
})

// LOGOUT
routerUsuarios.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie('token').sendFile(path.join(__dirname, '../public/logout.html'))
})


function checkAuthentication(req, res, next) {
    let token = req.cookies.token
    if (!token) {
        return res.status(403).send('debe proveer el token');
    }

    jwt.verify(token, jwtSecret, (err, value) => {
        if (err) return res.status(500).send('fallo la autenticacion con token');

        req.user = value;
        next();
    });
}

module.exports = routerUsuarios;