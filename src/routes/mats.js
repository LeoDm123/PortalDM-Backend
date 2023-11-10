const express = require("express");
const {
  crearMaterial,
  obtenerMats,
} = require("../controllers/mats.controllers");

const routerMats = express.Router();

routerMats.post("/crearMaterial", crearMaterial);
routerMats.get("/obtenerMats", obtenerMats);

module.exports = routerMats;
