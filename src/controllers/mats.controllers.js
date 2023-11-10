const Material = require("../models/materialModelo");

const crearMaterial = async (req, res) => {
  const { Detalle, Categoria, Ancho, Alto, Largo, Espesor, Costo } = req.body;

  try {
    let cliente = await Clientes.findOne({
      $or: [
        { $and: [{ ClientDNI: { $ne: "" } }, { ClientDNI }] },
        { $and: [{ ClientCUIT: { $ne: "" } }, { ClientCUIT }] },
      ],
    });

    if (cliente) {
      return res.json({
        msg: "El DNI o CUIT que intenta registrar ya se encuentra registrado",
      });
    }

    cliente = new Clientes(req.body);

    await cliente.save();

    res.json({
      msg: "Cliente registrado",
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
