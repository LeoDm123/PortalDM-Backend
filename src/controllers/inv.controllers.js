const InventarioLog = require("../models/inventarioLogModelo");

const crearLog = async (req, res) => {
  const {
    Codigo,
    Descripcion,
    Fecha,
    NroPedido,
    TipoMov,
    Cantidad,
    Unidad,
    Comentario,
  } = req.body;

  try {
    inventarioLog = new InventarioLog(req.body);

    await inventarioLog.save();

    res.json({
      msg: "Movimiento de inventario registrado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const obtenerLogs = async (req, res) => {
  try {
    const invenatarioLog = await InventarioLog.find();

    if (!invenatarioLog) {
      return res.status(404).json({ message: "Logs data not found" });
    }

    return res.status(200).json(invenatarioLog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const borrarLog = async (req, res) => {
  const { LogID } = req.body;

  try {
    const inventarioLog = await InventarioLog.findOne({ LogID });

    if (!inventarioLog) {
      return res.json({
        message: "Movimiento de inventario no encontrado",
      });
    }

    await inventarioLog.deleteOne();

    res.json({
      message: "Movimiento de inventario eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

module.exports = {
  crearLog,
  obtenerLogs,
  borrarLog,
};
