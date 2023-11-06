const express = require("express");
const {
  crearPresupuesto,
  DeletePres,
  EditPresupuesto,
} = require("../controllers/pres.controllers");

const routerPresupuestos = express.Router();

routerPresupuestos.post("/crearPresupuesto", crearPresupuesto);
routerPresupuestos.delete("/deletePres/:clientId/:presupuestoId", DeletePres);
routerPresupuestos.put(
  "/editPresupuesto/:clientId/:presupuestoId",
  EditPresupuesto
);

module.exports = routerPresupuestos;
