const Presupuestos = require("../models/PresupuestoModelo");
const Clientes = require("../models/clienteModelo");
const bcrypt = require("bcrypt");

const crearPresupuesto = async (req, res) => {
  const {
    PresupuestoCodigo,
    CondicionFacturacion,
    IVA,
    Precio,
    Total,
    ClientCUIT,
    Estado,
  } = req.body;

  try {
    const cliente = await Clientes.findOne({ ClientCUIT });

    if (!cliente) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    const presupuestoExistente = cliente.Presupuestos.find(
      (p) => p.PresupuestoCodigo === PresupuestoCodigo
    );

    if (presupuestoExistente) {
      return res.json({
        msg: "El código de presupuesto ya se encuentra registrado para este cliente",
      });
    }

    const presupuesto = new Presupuestos({
      PresupuestoCodigo,
      CondicionFacturacion,
      IVA,
      Precio,
      Total,
      Estado,
    });
    cliente.Presupuestos.push(presupuesto);

    await Promise.all([cliente.save()]);

    res.json({
      msg: "Presupuesto registrado correctamente en el cliente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const DeletePres = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const presupuestoId = req.params.presupuestoId;

    const client = await Clientes.findOne({ _id: clientId });

    if (!client) {
      console.log("Cliente no encontrado");
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const presupuestoIndex = client.Presupuestos.findIndex(
      (presupuesto) => presupuesto._id.toString() === presupuestoId
    );

    if (presupuestoIndex === -1) {
      console.log("Presupuesto no encontrado");
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }

    client.Presupuestos.splice(presupuestoIndex, 1);

    await client.save();

    return res
      .status(200)
      .json({ message: "Presupuesto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  crearPresupuesto,
  DeletePres,
};
