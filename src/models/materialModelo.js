const { Schema, model } = require("mongoose");

const materialchema = Schema({
  Detalle: {
    type: String,
    required: true,
  },
  Categoria: {
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
});

module.exports = model("Material", materialchema);
