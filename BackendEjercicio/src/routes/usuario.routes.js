//define una ruta para la creación de usuarios en una aplicación Node.js utilizando el framework Express.
import { Router } from 'express';
const router = Router();

import {
    //funciones del controller para la tabla usuarios
    CreateUserC,
    UpdateUserC,
    ListUsersC,
    GetUserByEmailC,
    GetUserByIdC,
    LoginC,
    LogoutC
} from '../controllers/usuario.controller.js';
import { validateTokenMiddleware } from '../middleware/VerificadorToken.js';


//metodos para ejecutar la tabla usuarios
router.get('/listarUsuarios', validateTokenMiddleware, ListUsersC);
router.post('/crearUser', CreateUserC);
router.put('/actualizarUsers/:id', UpdateUserC);
router.post('/login', LoginC)
router.post('/cerrarSesion', LogoutC);

router.get('/buscarUser/:id', GetUserByIdC);

export default router;


