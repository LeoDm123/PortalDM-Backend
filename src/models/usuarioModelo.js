const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userCategory: {
    type: String,
    required: true,
    default: "Admin",
  },
});

module.exports = model("Usuarios", usuarioSchema);
