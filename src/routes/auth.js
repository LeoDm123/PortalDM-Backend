const express = require("express");
const {
  crearUsuario,
  userLogin,
  obtenerUsuarios,
  DeleteUsuario,
  EditUsuario,
  obtenerUsuarioPorId,
} = require("../controllers/auth.controllers");

const routerAuth = express.Router();

routerAuth.post("/crearUsuario", crearUsuario);
routerAuth.post("/login", userLogin);
routerAuth.get("/obtenerUsuarios", obtenerUsuarios);
routerAuth.delete("/deleteUsuario/:id", DeleteUsuario);
routerAuth.put("/editUsuario/:id", EditUsuario);
routerAuth.get("/obtenerUsuarioPorId/:id", obtenerUsuarioPorId);

module.exports = routerAuth;
