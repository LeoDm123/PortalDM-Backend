const { Schema, model } = require("mongoose");

const CostosSchema = Schema({
  Materiales: [
    {
      Detalle: String,
      Costo: Number,
      Unidad: String,
      Ancho: Number,
      Alto: Number,
      Espesor: Number,
      Volumen: Number,
      Unidades: Number,
      Consumo: {
        valor: Number,
        unidad: String,
      },
      Categoria: String,
    },
  ],
  Parametros: [
    {
      Detalle: String,
      ValorCalculo: Number,
    },
  ],
  ManoObra: {
    Costo: Number,
    Fecha: String,
  },
  CostosFijos: [
    {
      Detalle: String,
      Costo: Number,
      Cobro: String,
    },
  ],
  Margenes: {
    Marco: Number,
    Hoja: Number,
    Lustre: Number,
    Vidrio: Number,
    Colocacion: Number,
    Desperdicio: Number,
  },
  Vidrios: {
    Tipo: String,
    Costo: Number,
    Unidad: "m2",
  },
});

module.exports = model("Costos", CostosSchema);
