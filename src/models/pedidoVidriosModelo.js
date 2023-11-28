const { Schema, model } = require("mongoose");

const pedidoVidriosSchema = Schema({
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
  Vidrios: {
    type: Array,
  },
});

module.exports = model("PedidosVidrios", pedidoVidriosSchema);
