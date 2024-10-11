const pool = require('../config/database');

const producto = {

    findAll: async function () {
        return await pool.execute('SELECT * FROM producto');
    },

    create: async function ( {Nombre, Descripcion, Precio, Stock, IdTienda} ) {

        return await pool.execute('INSERT INTO PRODUCTO (nombre, descripcion, precio, stock, id_tienda) VALUES (?, ?, ?, ?, ?)', [ Nombre, Descripcion, Precio, Stock, IdTienda ])        
    },

    findById: async function ( id ) {
        return await pool.execute('SELECT * FROM producto WHERE id = ?', [ id ]);
    },

    update: async function (id, {Nombre, Descripcion, Precio, Stock, IdTienda} ) {
        return await pool.execute('UPDATE PRODUCTO SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_tienda = ? WHERE id = ?', [Nombre, Descripcion, Precio, Stock, IdTienda, id]);
    },

    delete: async function (id) {
        return await pool.execute('DELETE FROM producto WHERE id = ?', [id]);
    }
}

module.exports = producto;