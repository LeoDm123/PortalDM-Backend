const express = require("express");
const {
  crearPedido,
  obtenerPedidos,
  deletePedido,
  recibirPedido,
  obtenerPedidoPorId,
  obtenerMaterialPorCodigo,
} = require("../controllers/pedidoHerrajes.controllers");

const routerPedidoHerrajes = express.Router();

routerPedidoHerrajes.post("/crearPedido", crearPedido);
routerPedidoHerrajes.get("/obtenerPedidos", obtenerPedidos);
routerPedidoHerrajes.delete("/deletePedido/:id", deletePedido);
routerPedidoHerrajes.put("/recibirPedido/:pedidoId/:codigoMat", recibirPedido);
routerPedidoHerrajes.get("/obtenerPedidoPorId/:pedidoId", obtenerPedidoPorId);
routerPedidoHerrajes.get(
  "/obtenerMaterialPorCodigo/:pedidoId/:codigoMat",
  obtenerMaterialPorCodigo
);

module.exports = routerPedidoHerrajes;
