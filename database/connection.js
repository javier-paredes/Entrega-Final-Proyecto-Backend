require('dotenv').config();
// const config = require('../config')
const mongoose = require('mongoose');
const url = process.env.MONGO_DB;  //config.MONGO_DB
require('../loggers/log4js')
const log4js = require("log4js");

const loggerConsola = log4js.getLogger('consola');
const loggerError = log4js.getLogger('error');

const connection = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    loggerConsola.info('[Mongoose] - connected in:', url);
});

mongoose.connection.on('error', (err) => {
    loggerError.error('[Mongoose] - error:', err);
});

module.exports = connection;