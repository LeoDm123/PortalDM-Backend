const express = require("express");
const {
  crearPedido,
  obtenerPedidos,
  deletePedido,
  recibirPedido,
  obtenerPedidoPorId,
  obtenerMaterialPorCodigo,
  EditEstado,
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
routerPedidoMadera.put("/editEstado/:pedidoId", EditEstado);

module.exports = routerPedidoMadera;
