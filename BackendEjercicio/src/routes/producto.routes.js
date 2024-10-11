const express = require('express');
const router = express.Router();

const {
    crearProductoC, 
    ListarProductosC,
    ListarProductosIdC,
    ActualizarProductoC,
    EliminarProductoC
} = require('../controllers/producto.controller')


router.post('/crearProducto', crearProductoC);
router.get('/productos', ListarProductosC);
router.get('/productos/:id', ListarProductosIdC);
router.put('/productos/:id', ActualizarProductoC);
router.delete('/productos/:id', EliminarProductoC);


module.exports = router