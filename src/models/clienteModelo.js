const { Schema, model } = require("mongoose");

const clienteSchema = Schema({
  ClientName: {
    type: String,
    required: true,
  },
  ClientApellido: {
    type: String,
  },
  ClientDNI: {
    type: String,
    unique: true,
  },
  ClientCUIT: {
    type: String,
    unique: true,
  },
  ClientAdress: {
    type: String,
  },
  ClientEmail: {
    type: String,
  },
  ClientIVACond: {
    type: String,
    required: true,
  },
  ClientTel: {
    type: String,
  },
  ClientStatus: {
    type: String,
    required: true,
  },
  Presupuestos: {
    type: Array,
  },
});

module.exports = model("Clientes", clienteSchema);
