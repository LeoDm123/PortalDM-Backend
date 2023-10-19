const { Schema, model } = require("mongoose");

const presupuestoSchema = Schema({
  CondicionFacturacion: {
    type: String,
    required: true,
  },
  IVA: {
    type: Number,
    required: true,
  },
  Precio: {
    type: String,
    required: true,
  },
  PresupuestoCodigo: {
    type: String,
    required: true,
    unique: true,
  },
  Total: {
    type: Number,
    required: true,
    unique: true,
  },
  Pagos: {
    type: Array,
  },
  Estado: {
    type: String,
    required: true,
  },
});

module.exports = model("Presupuestos", presupuestoSchema);
