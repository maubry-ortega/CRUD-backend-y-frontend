//consultas a la base de datos de mysql2 
import pool from '../config/database.js';

const Usuario = {
    //funcion para mostrar todo de la tabla usuarios, funciona asincronica nos retorna una consulta
    findAll: async function () {
        return await pool.execute('SELECT u.*, r.rol FROM Usuario u JOIN Rol r ON u.idRol = r.idRol');
    },
    create: async function (UsuarioData) {
        if (!UsuarioData.nombre || !UsuarioData.apellido || !UsuarioData.email || !UsuarioData.password || !UsuarioData.idRol) {
            throw new Error('Todos los campos son requeridos...');
        }

        const user = `INSERT INTO Usuario (nombre, apellido, email, password, idRol)
        VALUES (?, ?, ?, ?, ?)`;
        return pool.execute(user, [UsuarioData.nombre, UsuarioData.apellido, UsuarioData.email, UsuarioData.password, UsuarioData.idRol]);
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
                `UPDATE Usuario SET nombre = ?, apellido = ?, email = ?, password = ? WHERE idUsuario = ?`,
                [NuevoUsuario.nombre, NuevoUsuario.apellido, NuevoUsuario.email, NuevoUsuario.password, idUsuario]
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

export default Usuario;