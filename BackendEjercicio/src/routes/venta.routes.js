const express = require("express");
const router = express.Router();

const {
  CrearVentaC,
  ObtenerVentasC,
  ObtenerVentaPorIdC,
  ActualizarVentaC,
  EliminarVentaC,
} = require("../controllers/venta.controller");
const {
  validarObtenerVentaPorId,
  validarCrearVenta,
  validarActualizarVenta,
  validarEliminarVenta,
} = require("../middleware/venta.validations");

router.get("/obtenerVentas", ObtenerVentasC);
router.get("/obtenerVentas/:idVenta", validarObtenerVentaPorId, ObtenerVentaPorIdC);
router.post("/crearVenta", validarCrearVenta, CrearVentaC);
router.put("/actualizarVenta/:idVenta", validarActualizarVenta, ActualizarVentaC);
router.delete("/eliminarVenta/:idVenta", validarEliminarVenta, EliminarVentaC);

module.exports = router;
