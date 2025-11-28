// Script para crear productos de prueba en la base de datos
import http from 'http';

const API_HOST = 'localhost';
const API_PORT = 3002;
const API_PATH = '/crearProducto';

// Array de productos de ejemplo
const productos = [
    {
        Nombre: "Laptop HP Pavilion",
        Descripcion: "Laptop de alto rendimiento con procesador Intel i7, 16GB RAM, SSD 512GB",
        Precio: 899.99,
        Stock: 15,
        IdTienda: 1
    },
    {
        Nombre: "Mouse Logitech MX Master 3",
        Descripcion: "Mouse inalámbrico ergonómico con precisión avanzada",
        Precio: 99.99,
        Stock: 50,
        IdTienda: 1
    },
    {
        Nombre: "Teclado Mecánico Corsair K95",
        Descripcion: "Teclado mecánico RGB con switches Cherry MX",
        Precio: 179.99,
        Stock: 30,
        IdTienda: 1
    },
    {
        Nombre: "Monitor Samsung 27 pulgadas",
        Descripcion: "Monitor 4K UHD con tecnología HDR y 144Hz",
        Precio: 449.99,
        Stock: 20,
        IdTienda: 1
    },
    {
        Nombre: "Auriculares Sony WH-1000XM5",
        Descripcion: "Auriculares inalámbricos con cancelación de ruido premium",
        Precio: 349.99,
        Stock: 25,
        IdTienda: 1
    },
    {
        Nombre: "Webcam Logitech C920",
        Descripcion: "Webcam Full HD 1080p para videoconferencias",
        Precio: 79.99,
        Stock: 40,
        IdTienda: 1
    },
    {
        Nombre: "SSD Samsung 1TB",
        Descripcion: "Disco sólido NVMe M.2 de alta velocidad",
        Precio: 129.99,
        Stock: 60,
        IdTienda: 1
    },
    {
        Nombre: "Memoria RAM Corsair 32GB",
        Descripcion: "Kit de memoria DDR4 3200MHz (2x16GB)",
        Precio: 149.99,
        Stock: 35,
        IdTienda: 1
    }
];

// Función para crear un producto mediante petición HTTP POST
function crearProducto(producto) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(producto);

        const options = {
            hostname: API_HOST,
            port: API_PORT,
            path: API_PATH,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (res.statusCode === 201 || res.statusCode === 200) {
                        console.log(`✅ Producto creado: ${producto.Nombre}`);
                        resolve(response);
                    } else {
                        console.error(`❌ Error al crear ${producto.Nombre}:`, response);
                        resolve(null);
                    }
                } catch (error) {
                    console.error(`❌ Error al parsear respuesta para ${producto.Nombre}:`, error.message);
                    resolve(null);
                }
            });
        });

        req.on('error', (error) => {
            console.error(`❌ Error de conexión al crear ${producto.Nombre}:`, error.message);
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

// Función para esperar un tiempo determinado
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Función principal para crear todos los productos
async function crearTodosLosProductos() {
    console.log('🚀 Iniciando creación de productos...\n');
    console.log(`📡 Conectando a: http://${API_HOST}:${API_PORT}${API_PATH}\n`);

    let exitosos = 0;
    let fallidos = 0;

    for (const producto of productos) {
        try {
            const resultado = await crearProducto(producto);
            if (resultado) {
                exitosos++;
            } else {
                fallidos++;
            }
            // Pequeña pausa entre peticiones
            await esperar(500);
        } catch (error) {
            fallidos++;
            console.error(`❌ Error crítico:`, error.message);
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('✨ Proceso completado!');
    console.log(`✅ Productos creados exitosamente: ${exitosos}`);
    console.log(`❌ Productos fallidos: ${fallidos}`);
    console.log('='.repeat(50));
}

// Ejecutar el script
crearTodosLosProductos().catch(error => {
    console.error('Error fatal:', error);
    process.exit(1);
});
