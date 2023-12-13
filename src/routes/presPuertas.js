const express = require("express");
const {
  crearPresupuesto,
  DeletePres,
  EditPresupuesto,
} = require("../controllers/presPuertas.controllers");

const routerPresPuertas = express.Router();

routerPresPuertas.post("/crearPresupuesto", crearPresupuesto);
routerPresPuertas.delete("/deletePres/:clientId/:presupuestoId", DeletePres);
routerPresPuertas.put(
  "/editPresupuesto/:clientId/:presupuestoId",
  EditPresupuesto
);

module.exports = routerPresPuertas;
