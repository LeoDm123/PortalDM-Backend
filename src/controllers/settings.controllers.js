const Settings = require("../models/settingsModelo");

const crearConceptoPago = async (req, res) => {
  const { Detalle } = req.body;

  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    const concepto = settings.ConceptoPago.find((c) => c === Detalle);
    if (concepto) {
      return res.status(400).json({
        msg: "El concepto que intenta registrar ya existe",
      });
    }

    settings.ConceptoPago.push(Detalle);
    await settings.save();

    res.json({
      msg: "Concepto de pago registrado",
      data: settings,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const obtenerSettings = async (req, res) => {
  try {
    const concepto = await Settings.find();

    if (!concepto) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json(concepto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteConcepto = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.ConceptoPago = settings.ConceptoPago.filter(
      (concepto, i) => i.toString() !== index
    );

    await settings.save();

    return res
      .status(200)
      .json({ message: "Concepto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  crearConceptoPago,
  obtenerSettings,
  deleteConcepto,
};
