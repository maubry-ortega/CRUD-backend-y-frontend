//consultas a la base de datos de mysql2 
const pool = require('../config/database');
const mysql = require('mysql2');

const Usuario = {
    //funcion para mostrar todo de la tabla usuarios, funciona asincronica nos retorna una consulta
    findAll: async function () {
        return await pool.execute('SELECT u.*, r.rol FROM Usuario u JOIN Rol r ON u.idRol = r.idRol');
    },
    create: async function (UsuarioData) {
        if (!UsuarioData.identificacion || !UsuarioData.nombre || !UsuarioData.apellido || !UsuarioData.email || !UsuarioData.contrasena || !UsuarioData.direccion || !UsuarioData.fecha_nacimiento || !UsuarioData.idRol) {
            throw new Error('Todos los campos son requeridos...');
        }

        const user = `INSERT INTO Usuario (identificacion, nombre, apellido, email, contrasena, direccion, fecha_nacimiento, idRol )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        return pool.execute(user, [UsuarioData.identificacion, UsuarioData.nombre, UsuarioData.apellido, UsuarioData.email, UsuarioData.contrasena, UsuarioData.direccion, UsuarioData.fecha_nacimiento, UsuarioData.idRol]);
    },
    findOneUsuario: async function (id) {//devuelve un usuario específico por su ID.
        return await pool.execute('SELECT * FROM Usuario where idUsuario = ?', [id]);

    },
    findUserByEmail: async (email) => {
        return pool.execute('SELECT * FROM Usuario where email = ?', [email])
    },
    editUsuario: async function (idUsuario, NuevoUsuario) {//actualiza un usuario existente en la base de datos
        try {
            const [result] = await pool.execute(
                `UPDATE Usuario SET identificacion = ?, nombre = ?, apellido = ?, email = ?, contrasena = ?, direccion = ?, fecha_nacimiento = ?, identificacion = ?  WHERE id = ?`,
                [NuevoUsuario.identificacion, NuevoUsuario.nombre, NuevoUsuario.apellido, NuevoUsuario.email, NuevoUsuario.contrasena, NuevoUsuario.direccion, NuevoUsuario.fecha_nacimiento, NuevoUsuario.identificacion, idUsuario]
            );
            if (result.affectedRows === 0) {
                throw new Error('No se encontró el usuario');
            }
            return { mensaje: 'Usuario se actualizó correctamente' };
        } catch (error) {
            throw error;
        }
    },
    DeleteUsaurio: async function (idUsuario) {
        try {
            const [result] = await pool.execute('DELETE FROM Usuario WHERE idUsuario = ?', [idUsuario])
            if (result.affectedRows === 0) {
                throw new console.error('Usuario no existe')
            }
            return { message: 'Usuario elimnado existosamente' }
        } catch (error) {
            throw error
        }
    }
}

module.exports = Usuario;