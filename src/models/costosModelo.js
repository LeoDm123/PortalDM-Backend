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
      Porcentaje: Number,
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
});

module.exports = model("Costos", CostosSchema);
