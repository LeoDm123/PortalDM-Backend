const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userApellido: {
    type: String,
    required: true,
  },
  userDireccion: {
    type: String,
  },
  userTelefono: {
    type: String,
  },
  userDNI: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userCategoria: {
    type: String,
    required: true,
    default: "Admin",
  },
  userPrivilegios: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = model("Usuarios", usuarioSchema);
