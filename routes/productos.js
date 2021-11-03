const express = require('express');
const routerProductos = express.Router()
const ControladorProductos = require('../controladores/controllerProductos')

class RouterProductos {

    constructor() {
        this.controladorProductos = new ControladorProductos()
    }

    start() {
        routerProductos.get('/listar', this.controladorProductos.listarProductos)
        routerProductos.get('/listar/:id', this.controladorProductos.listarProductoPorId)
        routerProductos.post('/guardar', this.controladorProductos.guardarProducto)
        routerProductos.put('/actualizar/:id', this.controladorProductos.actualizarProducto)
        routerProductos.delete('/borrar/:id', this.controladorProductos.borrarProducto)

        return routerProductos;
    }
}

module.exports = new RouterProductos()
