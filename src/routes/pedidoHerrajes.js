const express = require("express");
const {
  crearPedido,
  obtenerPedidos,
  deletePedido,
  recibirPedido,
  obtenerPedidoPorId,
  obtenerMaterialPorCodigo,
  EditEstado,
  obtenerPedidosActivos,
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
routerPedidoHerrajes.put("/editEstado/:pedidoId", EditEstado);
routerPedidoHerrajes.get("/obtenerPedidosActivos", obtenerPedidosActivos);

module.exports = routerPedidoHerrajes;
