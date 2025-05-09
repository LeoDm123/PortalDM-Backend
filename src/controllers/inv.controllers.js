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
    const material = await Materiales.findOne({ Codigo });

    if (!material) {
      return res.status(404).json({ message: "Material no encontrado" });
    }

    let nuevoStock;

    const cantidadNumerica = parseFloat(Cantidad);

    if (TipoMov === "Ingreso") {
      nuevoStock = material.Stock + cantidadNumerica;
    } else if (TipoMov === "Egreso") {
      if (material.Stock < cantidadNumerica) {
        return res
          .status(400)
          .json({ message: "Stock insuficiente para el egreso" });
      }
      nuevoStock = material.Stock - cantidadNumerica;
    } else {
      return res.status(400).json({ message: "Tipo de movimiento no válido" });
    }

    const nuevoLog = new InventarioLog({
      Codigo,
      Descripcion,
      Fecha,
      NroPedido,
      TipoMov,
      Cantidad: cantidadNumerica,
      Unidad,
      Comentario,
    });

    await nuevoLog.save();

    const logParaMaterial = {
      _id: nuevoLog._id,
      CantRecibida: cantidadNumerica,
      FechaRecep: Fecha,
      nroPedido: NroPedido,
      Unidad,
      TipoMov,
      RemitoLog: Comentario,
    };

    await Materiales.updateOne(
      { Codigo },
      {
        $set: { Stock: nuevoStock },
        $push: { InvLog: logParaMaterial },
      }
    );

    res.json({
      message: "Movimiento registrado y stock actualizado",
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
