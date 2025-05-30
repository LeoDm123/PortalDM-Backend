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

// Crear un nuevo costo
const crearCosto = async (req, res) => {
  try {
    const nuevoCosto = new Costos(req.body);
    const costoGuardado = await nuevoCosto.save();
    res.status(201).json({
      ok: true,
      msg: "Costo creado exitosamente",
      costo: costoGuardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al crear el costo",
      error: error.message,
    });
  }
};

// Actualizar un costo
const actualizarCosto = async (req, res) => {
  try {
    const costoActualizado = await Costos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!costoActualizado) {
      return res.status(404).json({
        ok: false,
        msg: "Costo no encontrado",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "Costo actualizado exitosamente",
      costo: costoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar el costo",
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
