const { Schema, model } = require("mongoose");

const presPuertaSchema = Schema({
  Cliente: {
    type: String,
    required: true,
  },
  Obra: {
    type: String,
    required: true,
  },
  Codigo: {
    type: String,
    required: true,
  },
  Descuento: {
    type: Number,
  },
  Precio: {
    type: Number,
  },
  IVA: {
    type: Number,
  },
  PrecioFinal: {
    type: Number,
  },
  Puertas: {
    type: Array,
  },
});

module.exports = model("PresupuestoPuerta", presPuertaSchema);
