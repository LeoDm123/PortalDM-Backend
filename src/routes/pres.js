const express = require("express");
const {
  crearPresupuesto,
  DeletePres,
  obtenerPres,
} = require("../controllers/pres.controllers");

const routerPresupuestos = express.Router();

routerPresupuestos.post("/crearPresupuesto", crearPresupuesto);
routerPresupuestos.delete("/deletePres/:clientId/:presupuestoId", DeletePres);

module.exports = routerPresupuestos;
