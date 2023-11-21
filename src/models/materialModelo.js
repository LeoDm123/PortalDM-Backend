const { Schema, model } = require("mongoose");

const materialSchema = Schema({
  Codigo: {
    type: String,
    required: true,
  },
  Detalle: {
    type: String,
    required: true,
  },
  Categoria: {
    type: String,
    required: true,
  },
  Unidad: {
    type: String,
  },
  Ancho: {
    type: Number,
  },
  Alto: {
    type: Number,
  },
  Largo: {
    type: Number,
  },
  Espesor: {
    type: Number,
  },
  Costo: {
    type: Number,
  },
  StockSeguridad: {
    type: Number,
  },
  StockInicial: {
    type: Number,
  },
  Proveedor: {
    type: String,
    required: true,
  },
});

module.exports = model("Materiales", materialSchema);
