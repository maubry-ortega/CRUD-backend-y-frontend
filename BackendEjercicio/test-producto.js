// Script de prueba simple para crear un producto
import http from 'http';

const producto = {
    Nombre: "Producto de Prueba",
    Descripcion: "Este es un producto de prueba",
    Precio: 99.99,
    Stock: 10,
    IdTienda: 1
};

const postData = JSON.stringify(producto);

const options = {
    hostname: 'localhost',
    port: 3002,
    path: '/crearProducto',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('📡 Enviando petición POST a http://localhost:3002/crearProducto');
console.log('📦 Datos:', producto);
console.log('');

const req = http.request(options, (res) => {
    console.log(`📊 Status Code: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);
    console.log('');

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('📥 Respuesta del servidor:');
        try {
            const response = JSON.parse(data);
            console.log(JSON.stringify(response, null, 2));
        } catch (error) {
            console.log('Respuesta (texto plano):', data);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Error de conexión:', error.message);
    console.error('Detalles:', error);
});

req.write(postData);
req.end();
