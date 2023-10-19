const { Schema, model } = require("mongoose");

const pagoSchema = Schema({
  PresupuestoCodigo: {
    type: String,
    required: true,
    unique: true,
  },
  FechaPago: {
    type: String,
    required: true,
  },
  PagoCondicion: {
    type: String,
    required: true,
  },
  PagoConcepto: {
    type: String,
    required: true,
  },
  PagoComprobante: {
    type: String,
    required: true,
  },
  PagoMonto: {
    type: Number,
    required: true,
  },
  Comentarios: {
    type: String,
  },
});

module.exports = model("Pagos", pagoSchema);
