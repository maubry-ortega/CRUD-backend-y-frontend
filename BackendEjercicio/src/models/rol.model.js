const pool = require('../config/database');
const mysql = require('mysql2');

const Rol = {
  findAll: async function() {
    return await pool.execute('SELECT * FROM Rol');
  },

  create: async function(rolData) {
    if ( !rolData.rol ) {
      throw new Error('Todos los campos son requeridos');
    }

    const rol = `INSERT INTO Rol ( rol)
      VALUES (?)`;
    return pool.execute(rol, [rolData.rol]);
  },

  findByPk: async function(idRol) {
    return await pool.execute('SELECT * FROM Rol where idRol = ?', [idRol]);
  },

  editRol: async function(idRol, nuevoRol) {
    try {
      const [result] = await pool.execute(
        `UPDATE Rol SET  rol = ? WHERE idRol = ?`,
        [nuevoRol.rol, idRol]
      );
      if (result.affectedRows === 0) {
        throw new Error('No se encontró el rol');
      }
      return { mensaje: 'Rol se actualizó correctamente' };
    } catch (error) {
      throw error;
    }
  },

  deleteRol: async function(idRol) {
    try {
      const [result] = await pool.execute('DELETE FROM Rol WHERE idRol = ?', [idRol]);
      if (result.affectedRows === 0) {
        throw new Error('Rol no existe');
      }
      return { message: 'Rol eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Rol;