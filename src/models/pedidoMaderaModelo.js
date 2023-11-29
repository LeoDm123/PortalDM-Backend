const { Schema, model } = require("mongoose");

const pedidoMaderaSchema = Schema({
  Cliente: {
    type: String,
    required: true,
  },
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
  Proveedor: {
    type: String,
    required: true,
  },
  Materiales: {
    type: Array,
  },
});

module.exports = model("PedidosMadera", pedidoMaderaSchema);
