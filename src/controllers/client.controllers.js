const Clientes = require("../models/clienteModelo");

//Cmentario

const crearCliente = async (req, res) => {
  const {
    ClientName,
    ClientApellido,
    ClientIVACond,
    ClientDNI,
    ClientCUIT,
    ClientAdress,
    ClientTel,
    ClientEmail,
    ClientStatus,
    Presupuestos,
  } = req.body;

  try {
    let cliente = await Clientes.findOne({
      $or: [{ ClientDNI }, { ClientCUIT }],
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

const borrarCliente = async (req, res) => {
  const { ClientDNI } = req.body;

  try {
    const cliente = await Clientes.findOne({ ClientDNI });

    if (!cliente) {
      return res.json({
        msg: "Cliente no encontrado",
      });
    }

    await cliente.remove();

    res.json({
      msg: "Cliente eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Clientes.find();

    if (!clientes) {
      return res.status(404).json({ message: "Currency data not found" });
    }

    return res.status(200).json(clientes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteCliente = async (req, res) => {
  try {
    const deletedClient = await Clientes.findByIdAndDelete(req.params.id);

    if (!deletedClient) {
      return res.status(404).json({ message: "Operation not found" });
    }

    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const EditCliente = async (req, res) => {
  try {
    const clientId = req.params.id;
    const updatedClientData = req.body;
    console.log(updatedClientData);

    const updatedClient = await Clientes.findByIdAndUpdate(
      clientId,
      updatedClientData,
      { new: true }
    );

    res.json(updatedClient);
  } catch (error) {
    console.error("Error al editar la operación:", error);
    res.status(500).json({ error: "Error al editar la operación" });
  }
};

const obtenerClientePorId = async (req, res) => {
  try {
    const clienteId = req.params.id;
    const cliente = await Clientes.findById(clienteId);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  crearCliente,
  borrarCliente,
  obtenerClientes,
  DeleteCliente,
  EditCliente,
  obtenerClientePorId,
};
