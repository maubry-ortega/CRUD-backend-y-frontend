export default function validateRequiredFields(requiredFields) {
  return function (req, res, next) {

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      const errors = missingFields.map(field => `${field} es requerido`);
      return res.status(400).json({
        error: 'La solicitud es incorrecta. Faltan parámetros.',
        errores: errors
      });
    }

    // Si no hay errores, continuar
    next();
  };
}
