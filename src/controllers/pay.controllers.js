const Pagos = require("../models/PagoModelo");
const Clientes = require("../models/clienteModelo");

const crearPago = async (req, res) => {
  const {
    ClientCUIT,
    PresupuestoCodigo,
    FechaPago,
    PagoCondicion,
    PagoConcepto,
    PagoComprobante,
    PagoMonto,
    Comentarios,
  } = req.body;

  try {
    const cliente = await Clientes.findOne({ ClientCUIT });

    if (!cliente) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    const filtroPresupuesto = {
      "Presupuestos.PresupuestoCodigo": PresupuestoCodigo,
    };

    await Clientes.findOneAndUpdate(
      { ClientCUIT, "Presupuestos.PresupuestoCodigo": PresupuestoCodigo },
      {
        $push: {
          "Presupuestos.$.Pagos": {
            PresupuestoCodigo,
            FechaPago,
            PagoCondicion,
            PagoConcepto,
            PagoComprobante,
            PagoMonto,
            Comentarios,
          },
        },
      }
    );

    res.json({
      msg: "Pago registrado correctamente en el presupuesto",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  crearPago,
};
