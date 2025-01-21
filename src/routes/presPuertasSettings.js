const express = require("express");
const {
  crearComponenteMarco,
  crearComponenteHoja,
  crearRelleno,
  crearApliques,
  crearTerminacion,
  editarTerminacion,
  crearSeccionesMarcos,
  crearExtras,
  obtenerSettings,
  deleteComponenteMarco,
  deleteComponenteHoja,
  deleteRelleno,
  deleteApliques,
  deleteTerminacion,
  deleteSeccionesMarcos,
  deleteExtras,
} = require("../controllers/presPuertasSettings.controllers");

const routerPresPuertasSettings = express.Router();

routerPresPuertasSettings.post("/crearComponenteMarco", crearComponenteMarco);
routerPresPuertasSettings.post("/crearComponenteHoja", crearComponenteHoja);
routerPresPuertasSettings.post("/crearRelleno", crearRelleno);
routerPresPuertasSettings.post("/crearApliques", crearApliques);
routerPresPuertasSettings.post("/crearTerminacion", crearTerminacion);
routerPresPuertasSettings.post("/crearSeccionesMarcos", crearSeccionesMarcos);
routerPresPuertasSettings.post("/crearExtras", crearExtras);
routerPresPuertasSettings.get("/obtenerSettings", obtenerSettings);
routerPresPuertasSettings.put("/editarTerminacion", editarTerminacion);
routerPresPuertasSettings.delete(
  "/deleteComponenteMarco/:index",
  deleteComponenteMarco
);
routerPresPuertasSettings.delete(
  "/deleteComponenteHoja/:index",
  deleteComponenteHoja
);
routerPresPuertasSettings.delete("/deleteRelleno/:index", deleteRelleno);
routerPresPuertasSettings.delete("/deleteApliques/:index", deleteApliques);
routerPresPuertasSettings.delete(
  "/deleteTerminacion/:index",
  deleteTerminacion
);
routerPresPuertasSettings.delete(
  "/deleteSeccionesMarcos/:index",
  deleteSeccionesMarcos
);
routerPresPuertasSettings.delete("/deleteExtras/:index", deleteExtras);

module.exports = routerPresPuertasSettings;
