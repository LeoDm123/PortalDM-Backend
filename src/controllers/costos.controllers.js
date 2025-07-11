const Costos = require("../models/costosModelo");

// Obtener todos los costos
const getCostos = async (req, res) => {
  try {
    const costos = await Costos.find();
    res.status(200).json({
      ok: true,
      costos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener los costos",
      error: error.message,
    });
  }
};

// Obtener un costo por ID
const getCostoById = async (req, res) => {
  try {
    const costo = await Costos.findById(req.params.id);
    if (!costo) {
      return res.status(404).json({
        ok: false,
        msg: "Costo no encontrado",
      });
    }
    res.status(200).json({
      ok: true,
      costo,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener el costo",
      error: error.message,
    });
  }
};

// Crear o reemplazar el único costo
const crearCosto = async (req, res) => {
  try {
    const costoActualizado = await Costos.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.status(201).json({
      ok: true,
      msg: "Costo actualizado o creado exitosamente",
      costo: costoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al crear o actualizar el costo",
      error: error.message,
    });
  }
};

// Actualizar un costo
const actualizarCosto = async (req, res) => {
  const { arrayName, elementId } = req.params;
  const updateData = req.body;

  // Definir arrays permitidos (para seguridad)
  const allowedArrays = [
    "Materiales",
    "Parametros",
    "CostosFijos",
    "ManoObra",
    "Margenes",
    "Vidrios",
  ];
  if (!allowedArrays.includes(arrayName)) {
    return res.status(400).json({ ok: false, msg: "Array inválido" });
  }

  const setObj = {};
  for (const key in updateData) {
    setObj[`${arrayName}.$.${key}`] = updateData[key];
  }

  try {
    const docActualizado = await Costos.findOneAndUpdate(
      { [`${arrayName}._id`]: elementId },
      { $set: setObj },
      { new: true }
    );

    if (!docActualizado) {
      return res.status(404).json({ ok: false, msg: "Elemento no encontrado" });
    }

    return res.status(200).json({
      ok: true,
      msg: `Elemento de ${arrayName} actualizado correctamente`,
      data: docActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al actualizar elemento",
      error: error.message,
    });
  }
};

// Eliminar un costo
const eliminarCosto = async (req, res) => {
  try {
    const costoEliminado = await Costos.findByIdAndDelete(req.params.id);
    if (!costoEliminado) {
      return res.status(404).json({
        ok: false,
        msg: "Costo no encontrado",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "Costo eliminado exitosamente",
      costo: costoEliminado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar el costo",
      error: error.message,
    });
  }
};

module.exports = {
  getCostos,
  getCostoById,
  crearCosto,
  actualizarCosto,
  eliminarCosto,
};
