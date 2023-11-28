const express = require("express");
const {
  crearLog,
  obtenerLogs,
  borrarLog,
} = require("../controllers/inv.controllers");

const routerInv = express.Router();

routerInv.post("/crearLog", crearLog);
routerInv.get("/obtenerLogs", obtenerLogs);
routerInv.delete("/deleteLog/:id", borrarLog);

module.exports = routerInv;
