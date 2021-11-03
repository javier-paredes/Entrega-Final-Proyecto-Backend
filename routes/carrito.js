const express = require('express');
const routerCarrito = express.Router();
const ControladorCarrito = require('../controladores/controllerCarrito')

class RouterCarrito {

    constructor() {
        this.controladorCarrito = new ControladorCarrito()
    }

    start() {
        routerCarrito.get('/listar', this.controladorCarrito.listar) // LISTAR TODOS LOS CARRITOS
        routerCarrito.get('/listar/:id', this.controladorCarrito.listarPorId) // LISTAR CARRITO POR ID
        routerCarrito.post('/agregar/:id_producto', this.controladorCarrito.guardar) // LISTAR PRODUCTOS POR ID
        routerCarrito.put('/actualizar/:id', this.controladorCarrito.actualizar) // ACTUALIZAR PRODUCTO DENTRO DE CARRITO
        routerCarrito.delete('/borrar/:id', this.controladorCarrito.borrar) // BORRAR CARRITO
        routerCarrito.get('/comprar', this.controladorCarrito.comprar) // REALIZAR LA COMPRA DE LOS CONTENIDOS DEL CARRITO

        return routerCarrito;
    }
}

module.exports =  new RouterCarrito()
