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
} = require("../controllers/pedidoPerfiles.controllers");

const routerPedidoPerfiles = express.Router();

routerPedidoPerfiles.post("/crearPedido", crearPedido);
routerPedidoPerfiles.get("/obtenerPedidos", obtenerPedidos);
routerPedidoPerfiles.delete("/deletePedido/:id", deletePedido);
routerPedidoPerfiles.put("/recibirPedido/:pedidoId/:codigoMat", recibirPedido);
routerPedidoPerfiles.get("/obtenerPedidoPorId/:pedidoId", obtenerPedidoPorId);
routerPedidoPerfiles.get(
  "/obtenerMaterialPorCodigo/:pedidoId/:codigoMat",
  obtenerMaterialPorCodigo
);
routerPedidoPerfiles.put("/editEstado/:pedidoId", EditEstado);
routerPedidoPerfiles.get("/obtenerPedidosActivos", obtenerPedidosActivos);

module.exports = routerPedidoPerfiles;
