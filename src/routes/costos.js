const express = require("express");
const {
  getCostos,
  getCostoById,
  crearCosto,
  actualizarCosto,
  eliminarCosto,
} = require("../controllers/costos.controllers");

const routerCostos = express.Router();

// Rutas para costos
routerCostos.get("/getCostos", getCostos);
routerCostos.get("/getCostoById/:id", getCostoById);
routerCostos.post("/crearCosto", crearCosto);
routerCostos.put("/actualizarCosto/:array/:id", actualizarCosto);
routerCostos.delete("/eliminarCosto/:id", eliminarCosto);

module.exports = routerCostos;
