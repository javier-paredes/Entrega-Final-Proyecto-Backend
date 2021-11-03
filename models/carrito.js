const mongoose = require('mongoose');

const schema = mongoose.Schema({
    timestamp: { type: String, required: true, max: 100 },
    productos: { type: Object, required: true }   
}, { strict: false });

const Carrito = mongoose.model('carrito', schema);

module.exports = Carrito;