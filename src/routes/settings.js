const express = require("express");
const {
  crearConceptoPago,
  crearCondicionPago,
  crearCondicionFacturacion,
  crearMatsCategory,
  crearProveedor,
  crearUnidadMedida,
  obtenerSettings,
  deleteConceptoPago,
  deleteCondicionPago,
  deleteCondicionFacturacion,
  deleteMatsCategory,
  deleteProveedor,
  deleteUnidadMedida,
} = require("../controllers/settings.controllers");

const routerSettings = express.Router();

routerSettings.post("/crearConceptoPago", crearConceptoPago);
routerSettings.post("/crearCondicionPago", crearCondicionPago);
routerSettings.post("/crearCondicionFacturacion", crearCondicionFacturacion);
routerSettings.post("/crearMatsCategory", crearMatsCategory);
routerSettings.post("/crearProveedor", crearProveedor);
routerSettings.post("/crearUnidadMedida", crearUnidadMedida);
routerSettings.get("/obtenerSettings", obtenerSettings);
routerSettings.delete("/deleteConceptoPago/:index", deleteConceptoPago);
routerSettings.delete("/deleteCondicionPago/:index", deleteCondicionPago);
routerSettings.delete(
  "/deleteCondicionFacturacion/:index",
  deleteCondicionFacturacion
);
routerSettings.delete("/deleteMatsCategory/:index", deleteMatsCategory);
routerSettings.delete("/deleteProveedor/:index", deleteProveedor);
routerSettings.delete("/deleteUnidadMedida/:index", deleteUnidadMedida);

module.exports = routerSettings;
