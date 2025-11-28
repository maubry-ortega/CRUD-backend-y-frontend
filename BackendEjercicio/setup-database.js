// Script para crear las tablas en la base de datos
import pool from './src/config/database.js';
import fs from 'fs';

async function crearTablas() {
    try {
        console.log('🔧 Iniciando creación de tablas en la base de datos...\n');

        // Leer el archivo SQL
        const sqlContent = fs.readFileSync('./database-schema.sql', 'utf8');

        // Eliminar comentarios de línea (-- comentario)
        const sinComentarios = sqlContent
            .split('\n')
            .filter(line => !line.trim().startsWith('--'))
            .join('\n');

        // Dividir por punto y coma para ejecutar cada statement por separado
        const statements = sinComentarios
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        console.log(`📝 Se ejecutarán ${statements.length} statements SQL\n`);

        let tablasCreadasCount = 0;
        let datosInsertadosCount = 0;

        // Ejecutar cada statement
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (statement) {
                try {
                    const [result] = await pool.execute(statement);

                    // Extraer información del statement
                    const createTableMatch = statement.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?(\w+)`?/i);
                    const insertMatch = statement.match(/INSERT\s+INTO\s+`?(\w+)`?/i);

                    if (createTableMatch) {
                        tablasCreadasCount++;
                        console.log(`✅ Tabla '${createTableMatch[1]}' verificada/creada`);
                    } else if (insertMatch) {
                        datosInsertadosCount++;
                        console.log(`✅ Datos insertados en '${insertMatch[1]}'`);
                    } else {
                        console.log(`✅ Statement ${i + 1} ejecutado`);
                    }
                } catch (error) {
                    // Ignorar errores de duplicados
                    if (error.code === 'ER_DUP_ENTRY') {
                        console.log(`ℹ️  Registro duplicado (ignorado)`);
                    } else if (error.code === 'ER_TABLE_EXISTS_ERROR') {
                        console.log(`ℹ️  Tabla ya existe (ignorado)`);
                    } else {
                        const tableMatch = statement.match(/(?:TABLE|INTO)\s+(?:IF\s+NOT\s+EXISTS\s+)?`?(\w+)`?/i);
                        const tableName = tableMatch ? tableMatch[1] : 'desconocida';
                        console.error(`❌ Error en '${tableName}':`, error.message);
                        console.error(`   SQL: ${statement.substring(0, 100)}...`);
                    }
                }
            }
        }

        console.log('\n' + '='.repeat(50));
        console.log('✨ Base de datos configurada!');
        console.log(`📊 Tablas creadas/verificadas: ${tablasCreadasCount}`);
        console.log(`📦 Registros insertados: ${datosInsertadosCount}`);
        console.log('='.repeat(50));

        process.exit(0);
    } catch (error) {
        console.error('❌ Error fatal:', error.message);
        console.error(error);
        process.exit(1);
    }
}

crearTablas();
