//manejamos las solicitudes
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const {listaNegraService} = require('./ListaNegraService')


//exportamos las funciones

//funcion para filtrar usuario por su id 
const ObtenerUsuarioPorId = async function (idUsuario) {
    try {
        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) {
            throw new Error('No se encontró el usuario.');
        }
        return usuario;
    } catch (error) {
        throw error;
    }
}

// funcion para listar usuarios de la Bd
const ListarUsuarios = async function (){
    try {
        const usuarios = await Usuario.findAll({});
        return usuarios;
    } catch (error) {
        throw error;
    }
}
const CrearUsuario = async function (UsuarioData) {
    

    try {
        if (!UsuarioData) {
            throw new Error('Todos los campos son requeridos');
        }
        const Password =  UsuarioData.identificacion
        if(!Password){
            throw new Error
        }
        const PasswordEncriptado = await bcrypt.hash(Password, 10);
        UsuarioData.contrasena = PasswordEncriptado;

        const usuarioCreado = await Usuario.create(UsuarioData);
        return usuarioCreado;
    } catch (error) {
        throw error;
    }
}


const CrearToken =  async function (user){
    const {id, identificacion} = user;
    const payload = {id, identificacion};
    console.log(payload);
    const secret = process.env.JWT_SECRET;
    const options = {expiresIn: '3m'};
    const token = jwt.sign(payload, secret, options);
    return token
}


const Login = async function (req, res) {
    try {
        const { email, contrasena } = req.body;
        if (!email || !contrasena) {
            return res.status(400).json({ error: 'Credenciales necesarias' });
        }
        const [users] = await Usuario.findUserByEmail(email);
        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        const token = await CrearToken(user);
        return res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token,
            user: { id: user.id, identificacion: user.identificacion } 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

const ActualizarUser = async function(idUsuario, NuevoUsuario){
    try{
        
        const usuarioActualizado = await Usuario.editUsuario(idUsuario, NuevoUsuario);
        if (!usuarioActualizado) {
            throw new Error('No se pudo actualizar el usuario, o el usuario no existe.');
        }
        return usuarioActualizado;
    } catch (error) {
        throw error;
    }

}

const getUserByEmail = async (email) => {
    try {
        const [rows] = await Usuario.findUserByEmail(email);
        if (rows.length === 0) {
            throw new Error('Usuario no encontrado');
        }
        return rows[0];
    } catch (error) {
        throw error;
    }
}

const BuscarUsuarioporid = async function (idUsuario) {
    try {
        const buscandousuario = await Usuario.findOneUsuario(idUsuario);
        if (!buscandousuario) {
            throw new Error('No se pudo actualizar el usuario, o el usuario no existe.');
        }
        return buscandousuario;
    } catch (error) {
        throw error;
    }
}
const cerrarSesion = async (token) => {
    try {
        await listaNegraService.agregarToken(token);
        return { message: 'Sesión cerrada exitosamente' };
    } catch (error) {
        throw error;
    }
    };


module.exports ={
    CrearUsuario,
    ActualizarUser,
    BuscarUsuarioporid,
    ListarUsuarios,
    getUserByEmail,
    Login,
    cerrarSesion
}

/*
define un servicio para crear usuarios en una aplicación Node.js. La función CrearUsuario valida los datos del usuario, 
crea un nuevo usuario en la base de datos utilizando el modelo Usuario y maneja errores durante el proceso.
*/

/*const CrearRol = async function (rolData) {
    if (!rolData.nombreRol || !rolData.descripcionRol) {
        throw new Error('Todos los campos son requeridos');
    }
    const rol = `INSERT INTO Rol (nombreRol, descripcionRol)
        VALUES (?, ?)`;
    return pool.execute(rol, [rolData.nombreRol, rolData.descripcionRol]);
};

module.exports ={
    CrearUsuario,
    CrearRol
}*/