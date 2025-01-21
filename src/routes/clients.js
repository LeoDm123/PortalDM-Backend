const express = require("express");
const {
  crearCliente,
  borrarCliente,
  obtenerClientes,
  DeleteCliente,
  EditCliente,
  obtenerClientePorId,
} = require("../controllers/client.controllers");

const routerClients = express.Router();

routerClients.post("/crearCliente", crearCliente);
routerClients.post("/borrarCliente", borrarCliente);
routerClients.get("/obtenerClientes", obtenerClientes);
routerClients.delete("/deleteCliente/:id", DeleteCliente);
routerClients.put("/editCliente/:id", EditCliente);
routerClients.get("/obtenerClientePorId/:id", obtenerClientePorId);

module.exports = routerClients;
