const { Schema, model } = require("mongoose");

const materialchema = Schema({
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
    required: true,
  },
  Ancho: {
    type: Number,
    required: true,
  },
  Alto: {
    type: Number,
    required: true,
  },
  Largo: {
    type: Number,
    required: true,
  },
  Espesor: {
    type: Number,
    required: true,
  },
  Costo: {
    type: Number,
    required: true,
  },
  StockSeguridad: {
    type: Number,
    required: true,
  },
  StockInicial: {
    type: Number,
    required: true,
  },
  Proveedor: {
    type: String,
    required: true,
  },
});

module.exports = model("Materiales", materialchema);
