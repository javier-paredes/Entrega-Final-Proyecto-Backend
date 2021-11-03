require('dotenv').config();
// const config = require('./config')
const express = require('express');
const app = express();
// MOTOR DE PLANTILLAS
const handlebars = require('express-handlebars')
// LOGGERS
require('./loggers/log4js')
const log4js = require("log4js");
const loggerConsola = log4js.getLogger('consola');
const loggerError = log4js.getLogger('error');
// SESION
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
//DB
require('./database/connection');
const Ethereal = require('./mensajeria/emailEthereal')
// ARCHIVOS ESTÁTICOS
app.use(express.static('public'));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONFIG SESION
app.use(session({
    secret: process.env.SECRET, // config.SECRET
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

//CONFIGURAR HANDLEBARS
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts'
}));

// ESTABLECER MOTOR DE PLANTILLAS
app.set("view engine", "hbs");
// DIRECTORIO ARCHIVOS PLANTILLAS
app.set("views", "./views");

// ROUTERS
const productosRouter = require('./routes/productos')
const carritoRouter = require('./routes/carrito')
const usuarioRouter = require('./routes/usuarios');

app.use('/productos', productosRouter.start());
app.use('/carrito', carritoRouter.start());
app.use('/users', usuarioRouter);

app.get('/', async (req, res) => {
    if(isAuthenticated()){
        res.redirect('/users')
    }
})

// SERVER LISTEN
const server = app.listen(process.env.PORT, () => {
    loggerConsola.info(`servidor escuchando en http://localhost:${process.env.PORT}`)  // config.PORT
});

// SERVER "ON ERROR"
server.on('error', error => {
    Ethereal.enviarMailErrores(error)
    loggerError.error('error en el servidor:', error);
});
