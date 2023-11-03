const express = require("express");
const { crearPago, DeletePago } = require("../controllers/pay.controllers");

const routerPay = express.Router();

routerPay.post("/crearPago", crearPago);
routerPay.delete("/deletePago/:clientId/:presupuestoId/:pagoId", DeletePago);

module.exports = routerPay;
