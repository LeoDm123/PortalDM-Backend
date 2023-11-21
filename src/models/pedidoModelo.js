const { Schema, model } = require("mongoose");

const pedidoSchema = Schema({
  Obra: {
    type: String,
    required: true,
  },
  Fecha: {
    type: String,
    required: true,
  },
  NroPedido: {
    type: String,
    required: true,
  },
  OrdenCompra: {
    type: String,
    required: true,
  },
  Materiales: {
    type: Array,
  },
});

module.exports = model("Pedidos", pedidoSchema);