const { Schema, model } = require("mongoose");

const InventarioLogSchema = Schema({
  Codigo: {
    type: String,
    required: true,
  },
  Descripcion: {
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
  TipoMov: {
    type: String,
    required: true,
  },
  Cantidad: {
    type: String,
    required: true,
  },
  Unidad: {
    type: String,
    required: true,
  },
  Detalle: {
    type: String,
    required: true,
  },
});

module.exports = model("InventarioLog", InventarioLogSchema);
