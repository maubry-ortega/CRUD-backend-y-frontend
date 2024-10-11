const validarObtenerVentaPorId = (req, res, next) => {
    const {idVenta}  = req.params;
    if (!idVenta) {
        return res.status(400).json({ mensaje: `La venta con id = ${ idVenta }, no existe!` });
    }
    next();
}

const validarCrearVenta = (req, res, next) => {
    const { idUsuario, fechaVenta, total } = req.body;
    if (!idUsuario || !fechaVenta || !total) {
        return res.status(400).json({ error: 'Todos los campos son requeridos para crear una venta' });
    }
    next();  
};

const validarActualizarVenta = (req, res, next) => {
    const {idVenta}  = req.params;
    if (!idVenta) {
        return res.status(400).json({ error: 'El ID de la venta es requerido para actualizar' });
    }
    const { idUsuario, fechaVenta, total } = req.body;
    if (!idVenta || !idUsuario || !fechaVenta || !total) {
        return res.status(400).json({ error: 'Todos los campos son requeridos para actualizar una venta' });
    }
    next();  
};

const validarEliminarVenta = (req, res, next) => {
    const {idVenta}  = req.params;
    if (!idVenta) {
        return res.status(400).json({ error: 'El ID de la venta es requerido para eliminar' });
    }
    next(); 
};

module.exports = {
    validarObtenerVentaPorId,
    validarCrearVenta,
    validarActualizarVenta,
    validarEliminarVenta
};