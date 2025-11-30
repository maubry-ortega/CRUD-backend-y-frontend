// Manejo de solicitudes a la base de datos
import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { listaNegraService } from './ListaNegraService.js';


// ============================================
// Obtener usuario por ID
// ============================================
export const GetUserById = async function (userId) {
    try {
        const user = await Usuario.findByPk(userId);

        if (!user) {
            throw new Error('No se encontró el usuario.');
        }

        return user;
    } catch (error) {
        throw error;
    }
};


// ============================================
// Listar todos los usuarios
// ============================================
export const ListUsers = async function () {
    try {
        const users = await Usuario.findAll({});
        return users;
    } catch (error) {
        throw error;
    }
};


// ============================================
// Crear usuario
// ============================================
export const CreateUser = async function (userData) {
    try {
        console.log('Datos recibidos en CreateUser:', userData);
        if (!userData) {
            throw new Error('Todos los campos son requeridos');
        }

        // Usar la contraseña proporcionada
        const password = userData.password;

        if (!password) {
            throw new Error('Error al generar la contraseña');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        userData.password = encryptedPassword;

        const newUser = await Usuario.create(userData);
        return newUser;

    } catch (error) {
        console.error('Error en CreateUser:', error);
        throw error;
    }
};


// ============================================
// Crear token JWT
// ============================================
export const CreateToken = async function (user) {
    const { idUsuario, email } = user;

    const payload = { id: idUsuario, email };
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }

    const options = { expiresIn: '3m' };

    const token = jwt.sign(payload, secret, options);
    return token;
};


// ============================================
// Login
// ============================================
export const loginService = async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log('Intento de login:', email);

        if (!email || !password) {
            return res.status(400).json({ error: 'Credenciales necesarias' });
        }

        const [users] = await Usuario.findUserByEmail(email);

        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = await CreateToken(user);

        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.idUsuario,
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                idRol: user.idRol
            }
        });

    } catch (error) {
        console.error('Error en loginService:', error);
        return res.status(500).json({ error: 'Error al iniciar sesión: ' + error.message });
    }
};


// ============================================
// Actualizar usuario
// ============================================
export const UpdateUser = async function (userId, newUserData) {
    try {
        const updatedUser = await Usuario.editUsuario(userId, newUserData);

        if (!updatedUser) {
            throw new Error('No se pudo actualizar el usuario, o el usuario no existe.');
        }

        return updatedUser;

    } catch (error) {
        throw error;
    }
};


// ============================================
// Obtener usuario por email
// ============================================
export const GetUserByEmail = async function (email) {
    try {
        const [rows] = await Usuario.findUserByEmail(email);

        if (rows.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        return rows[0];

    } catch (error) {
        throw error;
    }
};


// ============================================
// Buscar usuario por ID con método personalizado
// ============================================
export const FindUserById = async function (userId) {
    try {
        const user = await Usuario.findOneUsuario(userId);

        if (!user) {
            throw new Error('No se pudo encontrar el usuario.');
        }

        return user;

    } catch (error) {
        throw error;
    }
};


// ============================================
// Cerrar sesión (agregar token a lista negra)
// ============================================
export const Logout = async (token) => {
    try {
        await listaNegraService.agregarToken(token);
        return { message: 'Sesión cerrada exitosamente' };
    } catch (error) {
        throw error;
    }
};
