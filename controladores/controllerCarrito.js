const Carrito = require('../api/carritoMongo');
const Ethereal = require('../mensajeria/emailEthereal')

class ControladorCarrito {

    constructor() {
        this.apiCarrito = Carrito
    }

    listar = async (req, res) => {
        try {
            let resultado = await Carrito.listar();
            res.json(resultado);
        }
        catch (error) {
            console.log('No se pudieron listar los carritos. Error: ', error)
        }
    }

    listarPorId = async (req, res) => {
        try {
            let idCarrito = req.params.id;
            let resultado = await Carrito.listarPorId(idCarrito);

            res.json(resultado);
        }
        catch (error) {
            console.log('No se pudo listar el carrito. Error: ', error)
        }
    }

    guardar = async (req, res) => {
        try {
            let idProducto = req.params.id_producto;
            let resultado = await Carrito.guardar(idProducto);
            res.json(resultado);
        }
        catch (error) {
            console.log('No se pudo guardar el producto en el carrito. Error: ', error)
        }
    }

    actualizar = async (req, res) => {
        try {
            let idCarrito = req.params.id;
            let nuevoProducto = req.body;
            let resultado = await Carrito.actualizar(idCarrito, nuevoProducto);
            res.json(resultado);
        }
        catch (error) {
            console.log('No se pudo actualizar el carrito. Error: ', error)
        }
    }

    borrar = async (req, res) => {
        try {
            let resultado = Carrito.borrar(req.params.id);
            res.json(resultado);
        }
        catch (error) {
            console.log('No se pudo borrar el carrito. Error: ', error)
        }
    }

    comprar = async (req, res) => {
        try {
            let contenidoCarrito = await Carrito.listar();
            Ethereal.enviarMailOrdenCompra(contenidoCarrito, req.user.nombre, req.user.email);
            await Carrito.limpiarDespuesDeOrden();
            res.send('ORDEN CONCRETADA');
        }
        catch (error) {
            console.log('No se pudo realizar la compra. Error: ', error)
        }
    }
}

module.exports = ControladorCarrito
