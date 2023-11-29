const express = require("express");
const {
  crearPedido,
  obtenerPedidos,
  deletePedido,
  recibirPedido,
  obtenerPedidoPorId,
  obtenerMaterialPorCodigo,
} = require("../controllers/pedidoMadera.controllers");

const routerPedidoMadera = express.Router();

routerPedidoMadera.post("/crearPedido", crearPedido);
routerPedidoMadera.get("/obtenerPedidos", obtenerPedidos);
routerPedidoMadera.delete("/deletePedido/:id", deletePedido);
routerPedidoMadera.put("/recibirPedido/:pedidoId/:codigoMat", recibirPedido);
routerPedidoMadera.get("/obtenerPedidoPorId/:pedidoId", obtenerPedidoPorId);
routerPedidoMadera.get(
  "/obtenerMaterialPorCodigo/:pedidoId/:codigoMat",
  obtenerMaterialPorCodigo
);

module.exports = routerPedidoMadera;
