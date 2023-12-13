const PresupuestoPuerta = require("../models/PresPuertaModelo");

const crearPresupuesto = async (req, res) => {
  const {
    Cliente,
    Obra,
    Codigo,
    Descuento,
    Precio,
    IVA,
    PrecioFinal,
    Puertas,
  } = req.body;

  try {
    const presupuestoPuerta = await PresupuestoPuerta.findOne({ Codigo });

    if (presupuestoPuerta) {
      return res.status(404).json({
        msg: "El presupuesto ya existe no encontrado",
      });
    }

    const presupuesto = new PresupuestoPuertas({
      Cliente,
      Obra,
      Codigo,
      Descuento,
      Precio,
      IVA,
      PrecioFinal,
      Puertas,
    });

    PresupuestoPuerta.push(presupuesto);

    await Promise.all([PresupuestoPuerta.save()]);

    res.json({
      msg: "Presupuesto creado correctamente",
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

const EditPresupuesto = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const presupuestoId = req.params.presupuestoId;
    const updatedPresData = req.body;
    const estadoPres = updatedPresData.Estado;

    const client = await Clientes.findById(clientId);

    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const presupuesto = client.Presupuestos.find(
      (presupuesto) => presupuesto._id.toString() === presupuestoId
    );

    if (!presupuesto) {
      console.log("Presupuesto no encontrado");
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }

    const index = client.Presupuestos.findIndex(
      (p) => p._id.toString() === presupuestoId
    );

    const presupuestoClone = { ...presupuesto };
    presupuestoClone.Estado = estadoPres;

    client.Presupuestos[index] = presupuestoClone;

    await client.save();

    res.json(presupuesto);
  } catch (error) {
    console.error("Error al editar el presupuesto:", error);
    res.status(500).json({ error: "Error al editar el presupuesto" });
  }
};

module.exports = {
  crearPresupuesto,
  DeletePres,
  EditPresupuesto,
};
