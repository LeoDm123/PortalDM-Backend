const express = require("express");
const {
  crearMaterial,
  obtenerMats,
  borrarMaterial,
  editMaterial,
  obtenerMatPorId,
  retirarIngresarMaterial,
} = require("../controllers/mats.controllers");

const routerMats = express.Router();

routerMats.post("/crearMaterial", crearMaterial);
routerMats.get("/obtenerMats", obtenerMats);
routerMats.delete("/deleteMat/:id", borrarMaterial);
routerMats.get("/obtenerMatPorID/:id", obtenerMatPorId);
routerMats.put("/editMat/:id", editMaterial);
routerMats.put("/retirarIngresarMat/:id", retirarIngresarMaterial);

module.exports = routerMats;
