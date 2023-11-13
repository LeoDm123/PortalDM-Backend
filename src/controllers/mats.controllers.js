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

module.exports = {
  crearMaterial,
  obtenerMats,
};
