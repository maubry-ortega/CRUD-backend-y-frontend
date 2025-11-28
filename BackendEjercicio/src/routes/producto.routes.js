import { Router } from 'express';
const router = Router();

import {
    crearProductoC,
    ListarProductosC,
    ListarProductosIdC,
    ActualizarProductoC,
    EliminarProductoC
} from '../controllers/producto.controller.js';


router.post('/crearProducto', crearProductoC);
router.get('/productos', ListarProductosC);
router.get('/productos/:id', ListarProductosIdC);
router.put('/productos/:id', ActualizarProductoC);
router.delete('/productos/:id', EliminarProductoC);


export default router;