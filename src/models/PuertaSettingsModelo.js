const { Schema, model } = require("mongoose");

const PuertaSettingsSchema = Schema({
  Marcos: [
    {
      Detalle: String,
      Pies2xM2: Number,
      AreaLustre: Number,
      Ancho: Number,
      Precio: Number,
    },
  ],
  Hoja: [
    {
      Detalle: String,
      Placa: String,
      AreaLustre: Number,
      Ancho: Number,
      Precio: Number,
    },
  ],
  CondFacturación: {
    type: Array,
  },
  Terminaciones: {
    type: Array,
  },
  Apliques: {
    type: Array,
  },
  Vidrios: {
    type: Array,
  },
});

module.exports = model("PuertaSettings", PuertaSettingsSchema);
