import mysql from 'mysql2';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, '..', 'ca.pem')),
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.query('SELECT 1 + 1 AS solution', function (err, rows) {
    if (err) {
        console.error('Error al conectarse a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL en la nube:', rows[0].solution);

    // Query to show tables
    pool.query('SHOW TABLES', (err, tables) => {
        if (err) {
            console.error('Error al obtener la lista de tablas:', err);
            return;
        }
        console.log('Tablas encontradas en la base de datos:', tables.map(t => t[`Tables_in_${process.env.DB_NAME}`]));
    });
});

export default pool.promise();