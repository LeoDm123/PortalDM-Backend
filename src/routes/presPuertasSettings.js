const express = require("express");
const {
  crearComponenteMarco,
  crearComponenteHoja,
  crearApliques,
  crearTerminaciones,
  crearSeccionesMarcos,
  crearExtras,
  obtenerSettings,
  deleteComponenteMarco,
  deleteComponenteHoja,
  deleteApliques,
  deleteTerminaciones,
  deleteSeccionesMarcos,
  deleteExtras,
} = require("../controllers/presPuertasSettings.controllers");

const routerPresPuertasSettings = express.Router();

routerPresPuertasSettings.post("/crearComponenteMarco", crearComponenteMarco);
routerPresPuertasSettings.post("/crearComponenteHoja", crearComponenteHoja);
routerPresPuertasSettings.post("/crearApliques", crearApliques);
routerPresPuertasSettings.post("/crearTerminaciones", crearTerminaciones);
routerPresPuertasSettings.post("/crearSeccionesMarcos", crearSeccionesMarcos);
routerPresPuertasSettings.post("/crearExtras", crearExtras);
routerPresPuertasSettings.get("/obtenerSettings", obtenerSettings);
routerPresPuertasSettings.delete(
  "/deleteComponenteMarco/:index",
  deleteComponenteMarco
);
routerPresPuertasSettings.delete(
  "/deleteComponenteHoja/:index",
  deleteComponenteHoja
);
routerPresPuertasSettings.delete("/deleteApliques/:index", deleteApliques);
routerPresPuertasSettings.delete(
  "/deleteTerminaciones/:index",
  deleteTerminaciones
);
routerPresPuertasSettings.delete(
  "/deleteSeccionesMarcos/:index",
  deleteSeccionesMarcos
);
routerPresPuertasSettings.delete("/deleteExtras/:index", deleteExtras);

module.exports = routerPresPuertasSettings;
