import { crearVenta, obtenerVentas, obtenerVentaPorId, actualizarVenta, eliminarVenta } from "../services/venta.service.js";


export const CrearVentaC = async (req, res) => {
  const ventaData = req.body;
  try {
    const result = await crearVenta(ventaData);
    res.status(201).json({ message: "Venta creada exitosamente", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const ObtenerVentasC = async (req, res) => {
  try {
    const ventas = await obtenerVentas();
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const ObtenerVentaPorIdC = async (req, res) => {
  const { idVenta } = req.params;
  try {
    const venta = await obtenerVentaPorId(idVenta);
    res.status(200).json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const ActualizarVentaC = async (req, res) => {
  const { idVenta } = req.params;
  const ventaData = req.body;
  try {
    const result = await actualizarVenta(idVenta, ventaData);
    res.status(200).json({ message: "Venta actualizada exitosamente", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const EliminarVentaC = async (req, res) => {
  const { idVenta } = req.params;
  try {
    const result = await eliminarVenta(idVenta);
    res.status(200).json({ message: 'Venta eliminada exitosamente', result })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
