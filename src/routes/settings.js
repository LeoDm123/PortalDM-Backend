const express = require("express");
const {
  crearConceptoPago,
  obtenerSettings,
  deleteConcepto,
} = require("../controllers/settings.controllers");

const routerSettings = express.Router();

routerSettings.post("/crearConceptoPago", crearConceptoPago);
routerSettings.get("/obtenerSettings", obtenerSettings);
routerSettings.delete("/deleteConcepto/:index", deleteConcepto);

module.exports = routerSettings;
