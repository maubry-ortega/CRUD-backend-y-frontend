//define una ruta para la creación de usuarios en una aplicación Node.js utilizando el framework Express.
import { Router } from 'express';
const router = Router();


import {
    //funciones del controller pare la tabla rol
    EditRolC,
    CrearRolC,
    ListarUsuRolC
} from '../controllers/rol.controller.js';

//metodos para ejecutar la tabla rol
router.get('/listarUsuRol', ListarUsuRolC)
router.post('/crearRol', CrearRolC);
router.put('/actualizarRol/:id', EditRolC);



export default router;


