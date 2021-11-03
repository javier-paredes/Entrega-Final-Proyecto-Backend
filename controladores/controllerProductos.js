const Productos = require('../api/productosMongo');

class ControladorProductos {

    constructor() {
        this.apiProducto = Productos
    }

    listarProductos = async (req, res) => {
        try {
            let resultado = await Productos.listar();
            res.json(resultado)
        }
        catch (error) {
            console.log('No se pudieron listar los productos. Error: ', error)
        }
    }

    listarProductoPorId = async (req, res) => {
        try {
            let idProducto = req.params.id;
            let productoPedido = await Productos.listarPorId(idProducto);
            res.json(productoPedido);
        }
        catch (error) {
            console.log('No se pudieron listar los productos. Error: ', error)
        }
    }

    guardarProducto = async (req, res) => {
        try {
            let nuevoProducto = req.body;
            let resultado = await Productos.guardar(nuevoProducto);
            res.json(resultado);
        }
        catch (error) {
            console.log('No se pudo guardar el producto: Error: ', error)
        }
    }

    actualizarProducto = async (req, res) => {
        try {
            let idProducto = req.params.id;
            let productoActualizado = req.body;
            let resultado = await Productos.actualizar(idProducto, productoActualizado);
            res.json(resultado);
        }
        catch (error) {
            console.log('No se pudo actualizar el producto. Error: ', error)
        }
    }

    borrarProducto = async (req, res) => {
        try {
            let idProducto = req.params.id;
            let resultado = await Productos.borrar(idProducto);
            res.json(resultado);
        }
        catch (error) {
            console.log('No se pudo borrar el producto. Error: ', error)
        }
    }
}

module.exports = ControladorProductos
