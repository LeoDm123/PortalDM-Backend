const { Schema, model } = require("mongoose");

const invLogSchema = new Schema({
  CantRecibida: {
    type: Number,
    required: true,
  },
  FechaRecep: {
    type: String,
    required: true,
  },
  nroPedido: {
    type: String,
  },
  Unidad: {
    type: String,
    required: true,
  },
  TipoMov: {
    type: String,
    required: true,
  },
  RemitoLog: {
    type: String,
  },
});

const materialSchema = new Schema({
  Codigo: {
    type: String,
    required: true,
  },
  Descripcion: {
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
  Stock: {
    type: Number,
  },
  Proveedor: {
    type: String,
    required: true,
  },
  InvLog: {
    type: [invLogSchema],
    default: [],
  },
});

module.exports = model("Materiales", materialSchema);
