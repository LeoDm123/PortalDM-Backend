const Materiales = require("../models/materialModelo");

const crearMaterial = async (req, res) => {
  const {
    Codigo,
    Detalle,
    Categoria,
    Unidad,
    Ancho,
    Alto,
    Largo,
    Espesor,
    Costo,
    StockSeguridad,
    StockInicial,
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
  const { MatID } = req.body;

  try {
    const material = await Materiales.findOne({ MatID });

    if (!material) {
      return res.json({
        message: "Material no encontrado",
      });
    }

    await material.deleteOne();

    res.json({
      message: "Material eliminado correctamente",
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

module.exports = {
  crearMaterial,
  obtenerMats,
  borrarMaterial,
  editMaterial,
  obtenerMatPorId,
};
