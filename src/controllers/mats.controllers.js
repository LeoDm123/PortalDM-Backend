const Materiales = require("../models/materialModelo");

const crearMaterial = async (req, res) => {
  const {
    Codigo,
    Descripcion,
    Categoria,
    Unidad,
    Ancho,
    Alto,
    Largo,
    Espesor,
    Costo,
    StockSeguridad,
    Stock,
    Proveedor,
  } = req.body;

  try {
    let material = await Materiales.findOne({
      Codigo,
    });

    if (material) {
      return res.json({
        msg: "Material ya se encuentra registrado",
      });
    }

    material = new Materiales(req.body);

    await material.save();

    res.json({
      msg: "Material registrado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const obtenerMats = async (req, res) => {
  try {
    const materiales = await Materiales.find();

    if (!materiales) {
      return res.status(404).json({ message: "Currency data not found" });
    }

    return res.status(200).json(materiales);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const borrarMaterial = async (req, res) => {
  const MatID = req.params.id;

  console.log("mat a eliminar", MatID);

  try {
    const material = await Materiales.findById(MatID);

    if (!material) {
      return res.json({
        message: "Material no encontrado",
      });
    }

    await material.deleteOne();

    res.json({
      message: `Material ${material.Descripcion} eliminado correctamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

const editMaterial = async (req, res) => {
  try {
    const MatId = req.params.id;
    const updatedMatData = req.body;

    const updatedMat = await Materiales.findByIdAndUpdate(
      MatId,
      updatedMatData,
      { new: true }
    );

    res.json(updatedMat);
  } catch (error) {
    console.error("Error al editar el material:", error);
    res.status(500).json({ error: "Error al editar el material" });
  }
};

const obtenerMatPorId = async (req, res) => {
  try {
    const matId = req.params.id;
    const material = await Materiales.findById(matId);

    if (!material) {
      return res.status(404).json({ message: "Material no encontrado" });
    }

    return res.status(200).json(material);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const retirarIngresarMaterial = async (req, res) => {
  try {
    const codigoMat = req.params.id;
    const { Cantidad, TipoMov, Fecha, Unidad, nroPedido, RemitoLog } = req.body;

    console.log(req.body);

    const materialEncontrado = await Materiales.findOne({ _id: codigoMat });

    if (!materialEncontrado) {
      console.log("Material no encontrado en el pedido");
      return res
        .status(404)
        .json({ message: "Material no encontrado en el pedido" });
    }

    let updatedStock;

    if (TipoMov === "Ingreso") {
      updatedStock = materialEncontrado.Stock + Cantidad;
    } else if (TipoMov === "Egreso") {
      if (materialEncontrado.Stock < Cantidad) {
        console.log("Stock insuficiente para el egreso");
        return res
          .status(400)
          .json({ message: "Stock insuficiente para el egreso" });
      }
      updatedStock = materialEncontrado.Stock - Cantidad;
    } else {
      console.log("Tipo de movimiento no válido");
      return res.status(400).json({ message: "Tipo de movimiento no válido" });
    }

    const updatedMaterial = await Materiales.findOneAndUpdate(
      { _id: codigoMat },
      { $set: { Stock: updatedStock } },
      { new: true }
    );

    const MaterialLog = {
      CantRecibida: Cantidad,
      FechaRecep: Fecha,
      nroPedido,
      Unidad,
      TipoMov,
      RemitoLog,
    };

    const updatedMaterialLog = await Materiales.findOneAndUpdate(
      { _id: codigoMat },
      { $push: { InvLog: MaterialLog } },
      { new: true }
    );

    res.json(updatedMaterial);
  } catch (error) {
    console.error("Error al editar el material:", error);
    res.status(500).json({ error: "Error al editar el material" });
  }
};

module.exports = {
  crearMaterial,
  obtenerMats,
  borrarMaterial,
  editMaterial,
  obtenerMatPorId,
  retirarIngresarMaterial,
};
