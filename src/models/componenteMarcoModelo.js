const { Schema, model } = require("mongoose");

const componenteMarcoSchema = Schema({
  Detalle: {
    type: String,
  },
  MatId: {
    type: String,
  },
});

module.exports = model("ComponenteMarco", componenteMarcoSchema);
