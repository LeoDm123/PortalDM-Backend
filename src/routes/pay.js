const express = require("express");
const { crearPago } = require("../controllers/pay.controllers");

const routerAuth = express.Router();

routerAuth.post("/crearPago", crearPago);

module.exports = routerAuth;
