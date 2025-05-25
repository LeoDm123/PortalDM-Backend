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
  Puertas: [
    {
      Nombre: String,
      Ancho: Number,
      Alto: Number,
      Cantidad: Number,
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
