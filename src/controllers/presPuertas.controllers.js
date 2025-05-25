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

const obtenerPresupuestos = async (req, res) => {
  try {
    const presupuestos = await PresupuestoPuerta.find();

    if (!presupuestos) {
      return res
        .status(404)
        .json({ message: "No se encontró información de presupuestos" });
    }

    return res.status(200).json(presupuestos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const DeletePres = async (req, res) => {
  try {
    const presupuestoId = req.params.presupuestoId;

    const presupuesto = await PresupuestoPuerta.findById(presupuestoId);

    if (!presupuesto) {
      console.log("Presupuesto no encontrado");
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }

    await PresupuestoPuerta.findByIdAndDelete(presupuestoId);

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
    const presupuestoId = req.params.presupuestoId;
    const updatedPresData = req.body;

    const presupuesto = await PresupuestoPuerta.findById(presupuestoId);

    if (!presupuesto) {
      console.log("Presupuesto no encontrado");
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }

    const updatedPresupuesto = await PresupuestoPuerta.findByIdAndUpdate(
      presupuestoId,
      updatedPresData,
      { new: true }
    );

    res.json(updatedPresupuesto);
  } catch (error) {
    console.error("Error al editar el presupuesto:", error);
    res.status(500).json({ error: "Error al editar el presupuesto" });
  }
};

module.exports = {
  crearPresupuesto,
  obtenerPresupuestos,
  DeletePres,
  EditPresupuesto,
};
