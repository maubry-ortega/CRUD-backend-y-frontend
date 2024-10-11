const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456789',
    database: 'backend',

});

pool.query('SELECT 1 + 1 AS solution', function(err, rows){
    if(err){
        console.error('Error al conectarse a la base de datos', err)
        return
    };
    console.log('conecion exitosa a mysql:', rows[0].solution);
    
});

module.exports = pool.promise();