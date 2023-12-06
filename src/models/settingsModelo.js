const { Schema, model } = require("mongoose");

const settingsSchema = Schema({
  ConceptoPago: {
    type: Array,
  },
  CondicionPago: {
    type: Array,
  },
  CondicionFacturacion: {
    type: Array,
  },
  MatsCategory: {
    type: Array,
  },
  Proveedores: {
    type: Array,
  },
  UnidadesMedida: {
    type: Array,
  },
});

module.exports = model("Settings", settingsSchema);
