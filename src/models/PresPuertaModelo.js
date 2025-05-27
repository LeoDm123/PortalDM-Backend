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
  CondFacturacion: {
    type: Number,
  },
  IVA: {
    type: Number,
  },
  PrecioFinal: {
    type: Number,
  },

  Status: {
    type: String,
  },
  Puertas: [
    {
      Nombre: String,
      Ancho: Number,
      Alto: Number,
      Cantidad: Number,
      PrecioUnit: Number,
      Marco: String,
      Hoja: String,
      Terminacion: String,
      Vidrio: {
        Tipo: String,
        Ancho: Number,
        Alto: Number,
        Cantidad: Number,
      },
      MarcoEnvolvente: Boolean,
      SinTerminacion: Boolean,
      SinColocacion: Boolean,
      PuertaPrincipal: Boolean,
      ComplejidadExtra: Number,
    },
  ],
});

module.exports = model("PresupuestoPuerta", presPuertaSchema);
