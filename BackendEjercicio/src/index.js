//llamados de las constantes de database y server (pool y bakend)
import Backend from './config/server.js';
import pool from './config/database.js';
import { config } from 'dotenv';

config();

Backend.listen(Backend.get("port"), () => {//inicializar el servidor y hacer que esté disponible en un puerto específico
   console.log('Puerto se esta ejecutando en:', Backend.get("port"));

})