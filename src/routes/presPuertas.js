const express = require("express");
const {
  crearPresupuesto,
  obtenerPresupuestos,
  DeletePres,
  EditPresupuesto,
} = require("../controllers/presPuertas.controllers");

const routerPresPuertas = express.Router();

routerPresPuertas.post("/crearPresupuesto", crearPresupuesto);
routerPresPuertas.get("/obtenerPresupuestos", obtenerPresupuestos);
routerPresPuertas.delete("/deletePres/:presupuestoId", DeletePres);
routerPresPuertas.put("/editPresupuesto/:presupuestoId", EditPresupuesto);

module.exports = routerPresPuertas;
