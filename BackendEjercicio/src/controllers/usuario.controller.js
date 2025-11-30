import {
    CreateUser,
    UpdateUser,
    ListUsers,
    GetUserByEmail,
    GetUserById,
    loginService,
    Logout
} from '../services/usuario.service.js';

import validateRequiredFields from '../middleware/camposRequeridos.js';


// Controlador para listar usuarios
export const ListUsersC = async function (req, res) {
    try {
        const users = await ListUsers(); // Llama al servicio para obtener los usuarios
        res.json(users); // Retorna los usuarios
    } catch (error) {
        res.status(500).json({ error: error.message }); // Error interno del servidor
    }
};


// Controlador para crear usuario
export const CreateUserC = async function (req, res) {
    try {
        // Validar campos requeridos
        validateRequiredFields([
            'nombre',
            'apellido',
            'email',
            'password',
            'idRol'
        ])(req, res, async () => {

            const userData = req.body; // Obtiene los datos del usuario

            // Validación manual adicional
            if (!userData.nombre || !userData.apellido ||
                !userData.email || !userData.password ||
                !userData.idRol) {
                return res.status(400).json({ error: 'Todos los campos son requeridos' });
            }

            const user = await CreateUser(userData); // Crea el usuario
            res.status(201).json(user); // Usuario creado exitosamente
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controlador para login
export const LoginC = async function (req, res) {
    try {
        await loginService(req, res); // Llama al servicio de login
    } catch (error) {
        console.error('Error en LoginC:', error);
        res.status(500).json({ error: error.message });
    }
};


// Controlador para actualizar usuario
export const UpdateUserC = async function (req, res) {
    try {
        const userData = req.body;
        const userId = req.params.id;

        const user = await UpdateUser(userId, userData); // Actualiza usuario
        return res.status(201).json(user); // Retorna usuario actualizado
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controlador para obtener usuario por email
export const GetUserByEmailC = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await getUserByEmail(email); // Busca usuario por email
        res.status(200).json(user);
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(500).json({ error: error.message });
    }
};


// Controlador para obtener usuario por ID (CORREGIDO)
export const GetUserByIdC = async function (req, res) {
    try {
        const userId = req.params.id;

        const user = await GetUserById(userId); // Llama al servicio correcto
        return res.status(200).json(user); // Retorna el usuario encontrado
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controlador para cerrar sesión
export const LogoutC = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ status: 401, error: 'No se proporcionó un token de autenticación' });
        }

        const token = authorizationHeader;

        await logout(token); // Llama al servicio de cerrar sesión

        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        next(error);
    }
};
