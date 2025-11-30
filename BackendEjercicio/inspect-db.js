import pool from './src/config/database.js';

async function inspect() {
    try {
        const [rows] = await pool.execute('DESCRIBE Usuario');
        console.log('Columns in Usuario table:');
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

inspect();
