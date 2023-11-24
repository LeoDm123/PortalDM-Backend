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

    const presupuesto = cliente.Presupuestos.find(
      (p) => p.PresupuestoCodigo === PresupuestoCodigo
    );

    if (!presupuesto) {
      return res.status(404).json({
        msg: "Presupuesto no encontrado",
      });
    }

    const pago = new Pagos({
      PresupuestoCodigo,
      FechaPago,
      PagoCondicion,
      PagoConcepto,
      PagoComprobante,
      PagoMonto,
      Comentarios,
    });

    presupuesto.Pagos = [...presupuesto.Pagos, pago];

    const updatedCliente = await Clientes.findOneAndUpdate(
      { ClientCUIT: cliente.ClientCUIT },
      { $set: { Presupuestos: cliente.Presupuestos } },
      { new: true }
    );

    if (!updatedCliente) {
      return res.status(404).json({ msg: "Error al actualizar el cliente" });
    }

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

const DeletePago = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const presupuestoId = req.params.presupuestoId;
    const pagoId = req.params.pagoId;

    const client = await Clientes.findOne({ _id: clientId });

    if (!client) {
      console.log("Cliente no encontrado");
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const presupuesto = client.Presupuestos.find(
      (pres) => pres._id.toString() === presupuestoId
    );

    if (!presupuesto) {
      console.log("Presupuesto no encontrado");
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }

    presupuesto.Pagos = presupuesto.Pagos.filter(
      (pago) => pago._id.toString() !== pagoId
    );

    const updatedCliente = await Clientes.findOneAndUpdate(
      { _id: clientId },
      { $set: { Presupuestos: client.Presupuestos } },
      { new: true }
    );

    if (!updatedCliente) {
      return res.status(404).json({ msg: "Error al actualizar el cliente" });
    }

    return res.status(200).json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  crearPago,
  DeletePago,
};
