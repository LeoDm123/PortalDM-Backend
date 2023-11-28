const express = require("express");
const {
  crearPedido,
  obtenerPedidos,
  deletePedido,
  recibirPedido,
  obtenerPedidoPorId,
  obtenerMaterialPorCodigo,
} = require("../controllers/pedidoVidrios.controllers");

const routerPedidoVidrios = express.Router();

routerPedidoVidrios.post("/crearPedido", crearPedido);
routerPedidoVidrios.get("/obtenerPedidos", obtenerPedidos);
routerPedidoVidrios.delete("/deletePedido/:id", deletePedido);
routerPedidoVidrios.put("/recibirPedido/:pedidoId/:codigoMat", recibirPedido);
routerPedidoVidrios.get("/obtenerPedidoPorId/:pedidoId", obtenerPedidoPorId);
routerPedidoVidrios.get(
  "/obtenerMaterialPorCodigo/:pedidoId/:codigoMat",
  obtenerMaterialPorCodigo
);

module.exports = routerPedidoVidrios;
