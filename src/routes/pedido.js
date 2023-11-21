const express = require("express");
const {
  crearPedido,
  obtenerPedidos,
} = require("../controllers/pedido.controllers");

const routerPedido = express.Router();

routerPedido.post("/crearPedido", crearPedido);
routerPedido.get("/obtenerPedidos", obtenerPedidos);

module.exports = routerPedido;
