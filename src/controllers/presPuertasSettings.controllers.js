const PresPuertasSettings = require("../models/presPuertasSettingsModelo");
const { ObjectId } = require("mongodb");

const crearComponenteMarco = async (req, res) => {
  const { Detalle, MatId, Caracteristica } = req.body;

  try {
    let settings = await PresPuertasSettings.findOne();

    if (!settings) {
      settings = new PresPuertasSettings();
    }

    const material = settings.ComponenteMarco.find((c) => c === Detalle);
    if (material) {
      return res.status(400).json({
        msg: "El material que intenta registrar ya existe",
      });
    }

    settings.ComponenteMarco.push({
      Detalle: Detalle,
      MatId: MatId,
      Caracteristica: Caracteristica,
    });
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

const crearComponenteHoja = async (req, res) => {
  const { Detalle, MatId } = req.body;

  try {
    let settings = await PresPuertasSettings.findOne();

    if (!settings) {
      settings = new PresPuertasSettings();
    }

    const material = settings.ComponenteHoja.find((c) => c === Detalle);
    if (material) {
      return res.status(400).json({
        msg: "El material que intenta registrar ya existe",
      });
    }

    settings.ComponenteHoja.push({
      Detalle: Detalle,
      MatId: MatId,
    });
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

const crearRelleno = async (req, res) => {
  const { Detalle, MatId } = req.body;

  try {
    let settings = await PresPuertasSettings.findOne();

    if (!settings) {
      settings = new PresPuertasSettings();
    }

    const material = settings.Relleno.find((c) => c === Detalle);
    if (material) {
      return res.status(400).json({
        msg: "El material que intenta registrar ya existe",
      });
    }

    settings.Relleno.push({
      Detalle: Detalle,
      MatId: MatId,
    });
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

const crearApliques = async (req, res) => {
  const {
    Detalle,
    Categoria,
    UnidadMedida,
    MatAsociado,
    Ancho,
    Alto,
    Largo,
    Cantidad,
    Precio,
    Porcentaje,
    MatId,
  } = req.body;

  try {
    let settings = await PresPuertasSettings.findOne();

    if (!settings) {
      settings = new PresPuertasSettings();
    }

    const condicion = settings.Apliques.find((c) => c === Detalle);
    if (condicion) {
      return res.status(400).json({
        msg: "La condición que intenta registrar ya existe",
      });
    }

    settings.Apliques.push({
      Detalle: Detalle,
      Categoria: Categoria,
      Unidad: UnidadMedida,
      MatAsociado: MatAsociado,
      Ancho: Ancho,
      Alto: Alto,
      Largo: Largo,
      Cantidad: Cantidad,
      Precio: Precio,
      Porcentaje: Porcentaje,
      MatId: MatId,
    });
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

const crearTerminacion = async (req, res) => {
  const { Detalle, materialesFromChild } = req.body;

  try {
    let settings = await PresPuertasSettings.findOne();

    if (!settings) {
      settings = new PresPuertasSettings();
    }

    const condicion = settings.Terminaciones.find((c) => c === Detalle);
    if (condicion) {
      return res.status(400).json({
        msg: "La terminación que intenta registrar ya existe",
      });
    }

    settings.Terminaciones.push({
      Detalle: Detalle,
      Materiales: materialesFromChild,
    });
    await settings.save();

    res.json({
      msg: "Terminación registrada",
      data: settings,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const editarTerminacion = async (req, res) => {
  const { terminacionIndex, Detalle, editedMats } = req.body;

  try {
    let settings = await PresPuertasSettings.findOne();

    if (!settings) {
      return res.status(404).json({
        msg: "Configuración no encontrada",
      });
    }

    const terminaciones = settings.Terminaciones;

    const Index = terminaciones.findIndex((t) => {
      console.log("t.index:", t.index);
      console.log("terminacionIndex:", terminacionIndex);
      return t.index === terminacionIndex;
    });

    if (Index === -1) {
      return res.status(404).json({
        msg: "Índice de terminación no válido",
      });
    }

    if (Detalle) {
      settings.Terminaciones[terminacionIndex].Detalle = Detalle;
    }

    settings.Terminaciones[terminacionIndex].Materiales = editedMats;

    await settings.save();

    res.json({
      msg: "Terminación actualizada",
      data: settings,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const crearSeccionesMarcos = async (req, res) => {
  const { Detalle } = req.body;

  try {
    let settings = await PresPuertasSettings.findOne();

    if (!settings) {
      settings = new PresPuertasSettings();
    }

    const condicion = settings.SeccionesMarcos.find((c) => c === Detalle);
    if (condicion) {
      return res.status(400).json({
        msg: "La condición que intenta registrar ya existe",
      });
    }

    settings.SeccionesMarcos.push(Detalle);
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

const crearExtras = async (req, res) => {
  const { Detalle } = req.body;

  try {
    let settings = await PresPuertasSettings.findOne();

    if (!settings) {
      settings = new PresPuertasSettings();
    }

    const condicion = settings.Extras.find((c) => c === Detalle);
    if (condicion) {
      return res.status(400).json({
        msg: "La condición que intenta registrar ya existe",
      });
    }

    settings.Extras.push(Detalle);
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

const obtenerSettings = async (req, res) => {
  try {
    const concepto = await PresPuertasSettings.find();

    if (!concepto) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json(concepto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteComponenteMarco = async (req, res) => {
  try {
    const settings = await PresPuertasSettings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Material no encontrado" });
    }

    const { index } = req.params;

    settings.ComponenteMarco = settings.ComponenteMarco.filter(
      (concepto, i) => i.toString() !== index
    );

    await settings.save();

    return res
      .status(200)
      .json({ message: "Material eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteComponenteHoja = async (req, res) => {
  try {
    const settings = await PresPuertasSettings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.ComponenteHoja = settings.ComponenteHoja.filter(
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

const deleteRelleno = async (req, res) => {
  try {
    const settings = await PresPuertasSettings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.Relleno = settings.Relleno.filter(
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

const deleteApliques = async (req, res) => {
  try {
    const settings = await PresPuertasSettings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.Apliques = settings.Apliques.filter(
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

const deleteTerminacion = async (req, res) => {
  try {
    const settings = await PresPuertasSettings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.Terminaciones = settings.Terminaciones.filter(
      (concepto, i) => i.toString() !== index
    );

    await settings.save();

    return res
      .status(200)
      .json({ message: "Terminación eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteSeccionesMarcos = async (req, res) => {
  try {
    const settings = await PresPuertasSettings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.SeccionesMarcos = settings.SeccionesMarcos.filter(
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

const deleteExtras = async (req, res) => {
  try {
    const settings = await PresPuertasSettings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Configuración no encontrada" });
    }

    const { index } = req.params;

    settings.Extras = settings.Extras.filter(
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
  crearComponenteMarco,
  crearComponenteHoja,
  crearRelleno,
  crearApliques,
  crearTerminacion,
  editarTerminacion,
  crearSeccionesMarcos,
  crearExtras,
  obtenerSettings,
  deleteComponenteMarco,
  deleteComponenteHoja,
  deleteRelleno,
  deleteApliques,
  deleteTerminacion,
  deleteSeccionesMarcos,
  deleteExtras,
};
