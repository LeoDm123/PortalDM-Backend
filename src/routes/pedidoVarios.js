const express = require("express");
const {
  crearPedido,
  obtenerPedidos,
  deletePedido,
  recibirPedido,
  obtenerPedidoPorId,
  obtenerMaterialPorCodigo,
  EditEstado,
} = require("../controllers/pedidoVarios.controllers");

const routerPedidoVarios = express.Router();

routerPedidoVarios.post("/crearPedido", crearPedido);
routerPedidoVarios.get("/obtenerPedidos", obtenerPedidos);
routerPedidoVarios.delete("/deletePedido/:id", deletePedido);
routerPedidoVarios.put("/recibirPedido/:pedidoId/:codigoMat", recibirPedido);
routerPedidoVarios.get("/obtenerPedidoPorId/:pedidoId", obtenerPedidoPorId);
routerPedidoVarios.get(
  "/obtenerMaterialPorCodigo/:pedidoId/:codigoMat",
  obtenerMaterialPorCodigo
);
routerPedidoVarios.put("/editEstado/:pedidoId", EditEstado);

module.exports = routerPedidoVarios;
