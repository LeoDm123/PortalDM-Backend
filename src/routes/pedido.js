const express = require("express");
const {
  crearPedido,
  obtenerPedidos,
  deletePedido,
  recibirPedido,
  obtenerPedidoPorId,
  obtenerMaterialPorCodigo,
} = require("../controllers/pedido.controllers");

const routerPedido = express.Router();

routerPedido.post("/crearPedido", crearPedido);
routerPedido.get("/obtenerPedidos", obtenerPedidos);
routerPedido.delete("/deletePedido/:id", deletePedido);
routerPedido.put("/recibirPedido/:pedidoId/:codigoMat", recibirPedido);
routerPedido.get("/obtenerPedidoPorId/:id", obtenerPedidoPorId);
routerPedido.get(
  "/obtenerMaterialPorCodigo/:pedidoId/:codigoMat",
  obtenerMaterialPorCodigo
);

module.exports = routerPedido;
