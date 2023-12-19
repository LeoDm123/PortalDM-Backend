const { Schema, model } = require("mongoose");

const presPuertasSettingsSchema = Schema({
  ComponenteMarco: {
    type: Array,
  },
  ComponenteHoja: {
    type: Array,
  },
  Relleno: {
    type: Array,
  },
  Apliques: {
    type: Array,
  },
  Terminaciones: {
    type: Array,
  },
  SeccionesMarcos: {
    type: Array,
  },
  Extras: {
    type: Array,
  },
});

module.exports = model("PresPuertasSettings", presPuertasSettingsSchema);
