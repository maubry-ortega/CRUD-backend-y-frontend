// vamos a ejecutar a traves de la libreria express
// llamar rutas del puerto que se van ejecutar atraves del puerto q se quiera
// usuarioRoutes constante que apartir de una cosnsulta me toma la ruta donde se necuentra usuairio.routes donde estan todas las rutas que se van a querer usar
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usuarioRoutes from '../routes/usuario.routes.js';
import RolRoutes from '../routes/rol.routes.js';
import ventaRoutes from '../routes/venta.routes.js';
import productosRoutes from '../routes/producto.routes.js';

// crear nuestra aplicacion express
const Backend = express();
const port = 3002;

Backend.use(cors({
    origin: 'http://localhost:4200', // Asegúrate de que esta URL coincida con la del frontend de Angular
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitido
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
}));


// Middlewares
Backend.use(express.json());
Backend.use(morgan('dev'));
Backend.use(express.urlencoded({ extended: true }));

Backend.use(usuarioRoutes);
Backend.use(RolRoutes);
Backend.use(ventaRoutes);
Backend.use(productosRoutes);


Backend.set('port', process.env.PORT || port);
export default Backend;