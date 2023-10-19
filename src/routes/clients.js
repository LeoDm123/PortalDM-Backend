const express = require("express");
const {
  crearCliente,
  borrarCliente,
  obtenerClientes,
  DeleteCliente,
  EditCliente,
  obtenerClientePorId,
} = require("../controllers/client.controllers");

//va a ser el nombre del router que definamos
const routerClients = express.Router();

//peticion get       Req = solicitud, va a estar esperando datos del FrontEnd
routerClients.post("/crearCliente", crearCliente);
routerClients.post("/borrarCliente", borrarCliente);
routerClients.get("/obtenerClientes", obtenerClientes);
routerClients.delete("/deleteCliente/:id", DeleteCliente);
routerClients.put("/editCliente/:id", EditCliente);
routerClients.get("/obtenerClientePorId/:id", obtenerClientePorId);

//module.exports es como vamos a exportar nuestros archivos
module.exports = routerClients;
