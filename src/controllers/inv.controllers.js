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
    const nuevoLog = new InventarioLog({
      Codigo,
      Descripcion,
      Fecha,
      NroPedido,
      TipoMov,
      Cantidad,
      Unidad,
      Comentario,
    });

    await nuevoLog.save();

    const logParaMaterial = {
      _id: nuevoLog._id,
      CantRecibida: Cantidad,
      FechaRecep: Fecha,
      nroPedido: NroPedido,
      Unidad,
      TipoMov,
      RemitoLog: Comentario,
    };

    await Materiales.updateOne(
      { Codigo },
      { $push: { InvLog: logParaMaterial } }
    );

    res.json({
      message: "Movimiento de inventario registrado correctamente",
      logId: nuevoLog._id,
    });
  } catch (error) {
    console.error("Error al crear log:", error);
    res.status(500).json({
      message: "Error en el servidor",
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
    const inventarioLog = await InventarioLog.findById(LogID);

    if (!inventarioLog) {
      return res.status(404).json({
        message: "Movimiento de inventario no encontrado",
      });
    }

    await Materiales.updateOne(
      { Codigo: inventarioLog.Codigo },
      {
        $pull: {
          InvLog: { _id: LogID },
        },
      }
    );

    await inventarioLog.deleteOne();

    res.json({
      message: "Movimiento de inventario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
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
