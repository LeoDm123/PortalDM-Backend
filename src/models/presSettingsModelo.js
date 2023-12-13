const { Schema, model } = require("mongoose");

const presSettingsSchema = Schema({
  ComponenteMarco: {
    type: Array,
  },
  ComponenteHoja: {
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

module.exports = model("PresSettings", presSettingsSchema);
