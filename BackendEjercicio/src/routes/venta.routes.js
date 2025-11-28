import { Router } from "express";
const router = Router();

import {
  CrearVentaC,
  ObtenerVentasC,
  ObtenerVentaPorIdC,
  ActualizarVentaC,
  EliminarVentaC,
} from "../controllers/venta.controller.js";
import {
  validarObtenerVentaPorId,
  validarCrearVenta,
  validarActualizarVenta,
  validarEliminarVenta,
} from "../middleware/venta.validations.js";

router.get("/obtenerVentas", ObtenerVentasC);
router.get("/obtenerVentas/:idVenta", validarObtenerVentaPorId, ObtenerVentaPorIdC);
router.post("/crearVenta", validarCrearVenta, CrearVentaC);
router.put("/actualizarVenta/:idVenta", validarActualizarVenta, ActualizarVentaC);
router.delete("/eliminarVenta/:idVenta", validarEliminarVenta, EliminarVentaC);

export default router;
