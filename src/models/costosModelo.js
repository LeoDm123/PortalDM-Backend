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
      LimiteSup: Number,
      LimiteInf: Number,
    },
  ],
  ManoObra: [
    {
      Costo: Number,
      Mes: Number,
      Año: Number,
      Aumento: Number,
    },
  ],
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
});

module.exports = model("Costos", CostosSchema);
