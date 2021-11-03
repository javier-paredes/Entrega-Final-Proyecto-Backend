const ModeloCarrito = require('../models/carrito')
const Productos = require('./productosMongo')

class Carrito {
    constructor() {
    }

    async listar() {
        try {
            let resultado = await ModeloCarrito.find({});
            return resultado;
        } catch (error) {
            console.log(error);
            return { "Error": 'No se encuentra el carrito con el id buscado' }
        }
    }
    async listarPorId(idCarrito) {
        try {
            let resultado = await ModeloCarrito.find({ _id: idCarrito });
            return resultado;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async guardar(idProducto) {
        try {
            let carrito = {
                timestamp: 'fecha',
                productos: {}
            }
            let timestamp = new Date().toLocaleString();
            let producto = await Productos.listarPorId(idProducto);
            carrito.timestamp = timestamp;
            carrito.productos = producto;
            let resultado = await ModeloCarrito.create(carrito);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async borrar(idCarrito) {
        try {
            let resultado = await ModeloCarrito.findByIdAndDelete(idCarrito)
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async actualizar(idCarrito, nuevoProducto) {
        try {
            let nuevoCarrito = await ModeloCarrito.find({ _id: idCarrito });
            nuevoCarrito.productos = nuevoProducto;
            let resultado = await ModeloCarrito.findByIdAndUpdate(idCarrito, nuevoCarrito);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async limpiarDespuesDeOrden() {
        try {
            await ModeloCarrito.deleteMany({})
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Carrito();
