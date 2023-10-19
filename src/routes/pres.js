const express = require("express");
const {
  crearPresupuesto,
  DeletePres,
} = require("../controllers/pres.controllers");

const routerPresupuestos = express.Router();

routerPresupuestos.post("/crearPresupuesto", crearPresupuesto);
routerPresupuestos.delete(
  "/deletePres/:clientId/:presupuestoCodigo",
  DeletePres
);

module.exports = routerPresupuestos;
