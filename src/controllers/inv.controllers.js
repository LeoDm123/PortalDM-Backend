const InventarioLog = require("../models/inventarioLogModelo");
const Materiales = require("../models/materialModelo");
const Pedidos = require("../models/pedidoPerfilesModelo");

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

    const material = await Materiales.findOne({ Codigo: inventarioLog.Codigo });

    if (!material) {
      return res.status(404).json({
        message: "Material asociado no encontrado",
      });
    }

    const cantidadNumerica = parseFloat(inventarioLog.Cantidad);
    let nuevoStock;

    if (inventarioLog.TipoMov === "Ingreso") {
      nuevoStock = material.Stock - cantidadNumerica;
    } else if (inventarioLog.TipoMov === "Egreso") {
      nuevoStock = material.Stock + cantidadNumerica;
    } else {
      return res.status(400).json({ message: "Tipo de movimiento inválido" });
    }

    // 1. Ajustar el stock y eliminar log en Materiales
    await Materiales.updateOne(
      { Codigo: inventarioLog.Codigo },
      {
        $set: { Stock: nuevoStock },
        $pull: { InvLog: { _id: LogID } },
      }
    );

    // 2. Eliminar también la recepción dentro del Pedido
    await Pedidos.updateOne(
      { "Materiales.Recepciones._id": LogID },
      {
        $pull: {
          "Materiales.$[].Recepciones": { _id: LogID },
        },
      }
    );

    // 3. Eliminar log en InventarioLog
    await inventarioLog.deleteOne();

    res.json({
      message: "Log eliminado y stock actualizado correctamente",
      nuevoStock,
    });
  } catch (error) {
    console.error("Error al borrar el log:", error);
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
