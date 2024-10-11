const Venta = require("../models/venta.model");

const VentaService = {
  crearVenta: async (ventaData) => {
    try {
      const result = await Venta.create(ventaData);
      return result;
    } catch (error) {
      throw error("Error al crear la venta: " + error.message);
    }
  },

  obtenerVentas: async () => {
    try {
      const [ventas] = await Venta.findAll();
      return ventas;
    } catch (error) {
      throw error("Error al obtener las ventas: ", error.message);
    }
  },

  obtenerVentaPorId: async (idVenta) => {
    try {
      const [venta] = await Venta.findById(idVenta);
      return venta[0];
    } catch (error) {
      throw new Error("Error al obtener la venta: ", error.message);
    }
  },

  actualizarVenta: async (idVenta, ventaData) => {
    const {idUsuario, fechaVenta, total } = ventaData;

    if (!idUsuario || !fechaVenta || !fechaVenta || !total) {
      throw new Error("Todos los campos son requeridos");
    }

    try {
      const result = await Venta.update(idVenta, ventaData);
      if (result.affectedRows === 0) {
        throw new Error(`No se encontró una venta con el id = ${idVenta}`);
      }
      return result;
    } catch (error) {
      throw new Error('Error al actualizar la venta' + error.message);
    }
  },

  eliminarVenta: async (idVenta) => {
    try {
      if(!idVenta){
        throw new Error("El id de la venta es requerido");
      }
      const result = Venta.delete(idVenta);
      if (result.affectedRows === 0) {
        throw new Error(`No se encontró una venta con el id = ${idVenta}`);
      }
      return result
    } catch (error) {
      throw new Error('Error al eliminar la venta' + error.message);
    }
  }
};
module.exports = VentaService;
