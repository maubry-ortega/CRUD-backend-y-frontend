import jwt from 'jsonwebtoken';
import { listaNegraService } from '../services/ListaNegraService.js';


// Middleware para validar el token JWT
export const validateTokenMiddleware = async (req, res, next) => {
  try {
    // Verifica que la solicitud tenga headers y autorización
    if (!req?.headers?.authorization) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    // Validar si el token está en la lista negra
    const tokenInBlacklist = await listaNegraService.tokenEnListaNegra(token);

    if (tokenInBlacklist) {
      return res.status(401).json({ error: 'El token está en la lista negra' });
    }

    // Verificar token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token no válido' });
      }

      // Guardamos los datos del usuario en la request
      req.user = decoded;
      req.id = decoded.id;

      next();
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en validateTokenMiddleware' });
  }
};
