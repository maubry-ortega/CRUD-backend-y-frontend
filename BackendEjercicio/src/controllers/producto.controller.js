const producto = require('../services/producto.service');

const controller = {};

controller.crearProductoC = async function (req, res) {
    const ProductoData = req.body;

    try {
        const productoCreado = await producto.crearProducto(ProductoData);
        res.status(201).json( productoCreado );

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

controller.ListarProductosC = async function (req, res) {
    try {
        const productos = await producto.ListarProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

controller.ListarProductosIdC = async function (req, res) {
    
    const id = req.params.id;

    try {

        const productoEncontrado = await producto.ListarProductosId( id );

        if (productoEncontrado.length === 0){
            return res.status(404).json({ error: 'producto no encontrado'})
        }
        res.status(200).json(productoEncontrado[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

controller.ActualizarProductoC = async function (req, res) {
    const  { id }  = req.params;
    const ProductoData = req.body
    try {
        const result = await producto.ActualizarProducto(id, ProductoData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

controller.EliminarProductoC = async function (req, res) {
    const id = req.params.id;

    try {
        const result = await producto.EliminarProducto(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

module.exports = controller;