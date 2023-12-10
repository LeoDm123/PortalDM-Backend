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

const crearCondicionPago = async (req, res) => {
  const { Detalle } = req.body;

  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    const condicion = settings.CondicionPago.find((c) => c === Detalle);
    if (condicion) {
      return res.status(400).json({
        msg: "La condición que intenta registrar ya existe",
      });
    }

    settings.CondicionPago.push(Detalle);
    await settings.save();

    res.json({
      msg: "Condición de pago registrado",
      data: settings,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const crearCondicionFacturacion = async (req, res) => {
  const { Detalle, equivIVA } = req.body;

  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    const condicion = settings.CondicionFacturacion.find((c) => c === Detalle);
    if (condicion) {
      return res.status(400).json({
        msg: "La condición que intenta registrar ya existe",
      });
    }

    settings.CondicionFacturacion.push({ Detalle, equivIVA });
    await settings.save();

    res.json({
      msg: "Condición de facturación registrado",
      data: settings,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const crearMatsCategory = async (req, res) => {
  const { Detalle } = req.body;

  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    const category = settings.MatsCategory.find((c) => c === Detalle);
    if (category) {
      return res.status(400).json({
        msg: "La categoría que intenta registrar ya existe",
      });
    }

    settings.MatsCategory.push(Detalle);
    await settings.save();

    res.json({
      msg: "Categoría de materiales registrada",
      data: settings,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const crearProveedor = async (req, res) => {
  const { Detalle } = req.body;

  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    const category = settings.Proveedor.find((c) => c === Detalle);
    if (category) {
      return res.status(400).json({
        msg: "El proveedor que intenta registrar ya existe",
      });
    }

    settings.Proveedor.push(Detalle);
    await settings.save();

    res.json({
      msg: "Proveedor registrado",
      data: settings,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const crearUnidadMedida = async (req, res) => {
  const { Detalle } = req.body;

  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    const category = settings.UnidadesMedida.find((c) => c === Detalle);
    if (category) {
      return res.status(400).json({
        msg: "La unidad que intenta registrar ya existe",
      });
    }

    settings.UnidadesMedida.push(Detalle);
    await settings.save();

    res.json({
      msg: "Unidad de medida registrada",
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

const deleteConceptoPago = async (req, res) => {
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
      .json({ message: "Concepto de pago eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteCondicionPago = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.CondicionPago = settings.CondicionPago.filter(
      (concepto, i) => i.toString() !== index
    );

    await settings.save();

    return res
      .status(200)
      .json({ message: "Conidición de pago eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteCondicionFacturacion = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.CondicionFacturacion = settings.CondicionFacturacion.filter(
      (concepto, i) => i.toString() !== index
    );

    await settings.save();

    return res
      .status(200)
      .json({ message: "Conidición de facturación eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteMatsCategory = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.MatsCategory = settings.MatsCategory.filter(
      (concepto, i) => i.toString() !== index
    );

    await settings.save();

    return res
      .status(200)
      .json({ message: "Categoría de materiales eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteProveedor = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.Proveedor = settings.Proveedor.filter(
      (concepto, i) => i.toString() !== index
    );

    await settings.save();

    return res
      .status(200)
      .json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteUnidadMedida = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.UnidadesMedida = settings.UnidadesMedida.filter(
      (concepto, i) => i.toString() !== index
    );

    await settings.save();

    return res
      .status(200)
      .json({ message: "Unidad de medida eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  crearConceptoPago,
  crearCondicionPago,
  crearCondicionFacturacion,
  crearMatsCategory,
  crearProveedor,
  crearUnidadMedida,
  obtenerSettings,
  deleteConceptoPago,
  deleteCondicionPago,
  deleteCondicionFacturacion,
  deleteMatsCategory,
  deleteProveedor,
  deleteUnidadMedida,
};
