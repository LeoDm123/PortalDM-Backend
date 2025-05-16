const Pedidos = require("../models/pedidoVidriosModelo");
const Materiales = require("../models/materialModelo");

const crearPedido = async (req, res) => {
  const { Cliente, Obra, Fecha, NroPedido, Estado, Vidrios } = req.body;

  try {
    let pedido = await Pedidos.findOne({
      NroPedido,
    });

    if (pedido) {
      return res.json({
        msg: "Pedido ya se encuentra registrado",
      });
    }

    pedido = new Pedidos(req.body);

    await pedido.save();

    res.json({
      msg: "Pedido registrado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedidos.find();

    if (!pedidos) {
      return res.status(404).json({ message: "No se encontraron los pedidos" });
    }

    return res.status(200).json(pedidos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePedido = async (req, res) => {
  try {
    const deletedPedido = await Pedidos.findByIdAndDelete(req.params.id);

    if (!deletedPedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    return res.status(200).json({ message: "Pedido eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedidoId = req.params.pedidoId;

    const pedido = await Pedidos.findOne({ _id: pedidoId });

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    return res.status(200).json(pedido);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const recibirPedido = async (req, res) => {
  try {
    const pedidoId = req.params.pedidoId;
    const codigoMat = req.params.codigoMat;
    const { CantRecibida, FechaRecep, nroPedido, NroRemito, RemitoLog } =
      req.body;

    console.log("REQ:", req.body);

    const pedido = await Pedidos.findOne({ _id: pedidoId });

    if (!pedido) {
      console.log("Pedido no encontrado");
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    const materialEncontrado = pedido.Vidrios.find(
      (material) => material.Codigo === codigoMat
    );

    if (!materialEncontrado) {
      console.log("Material no encontrado en el pedido");
      return res
        .status(404)
        .json({ message: "Material no encontrado en el pedido" });
    }

    materialEncontrado.Recepciones = materialEncontrado.Recepciones || [];
    materialEncontrado.Recepciones.push(req.body);

    const updatedPedido = await Pedidos.findOneAndUpdate(
      { _id: pedidoId },
      { $set: { Vidrios: pedido.Vidrios } },
      { new: true }
    );

    return res.status(200).json(materialEncontrado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const obtenerMaterialPorCodigo = async (req, res) => {
  try {
    const pedidoId = req.params.pedidoId;
    const codigoMat = req.params.codigoMat;

    const pedido = await Pedidos.findOne({ _id: pedidoId });

    if (!pedido) {
      console.log("Pedido no encontrado");
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    const materialEncontrado = pedido.Vidrios.find(
      (material) => material.Codigo === codigoMat
    );

    if (!materialEncontrado) {
      console.log("Material no encontrado en el pedido");
      return res
        .status(404)
        .json({ message: "Material no encontrado en el pedido" });
    }

    return res.status(200).json(materialEncontrado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const EditEstado = async (req, res) => {
  try {
    const pedidoId = req.params.pedidoId;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ error: "El estado es requerido" });
    }

    const updatedPedido = await Pedidos.findOneAndUpdate(
      { _id: pedidoId },
      { $set: { Estado: estado } },
      { new: true }
    );

    if (!updatedPedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json(updatedPedido);
  } catch (error) {
    console.error("Error al editar la operación:", error);
    res.status(500).json({ error: "Error al editar la operación" });
  }
};

const obtenerPedidosActivos = async (req, res) => {
  try {
    const pedidosActivos = await Pedidos.find({ Estado: "Activo" });

    if (!pedidosActivos || pedidosActivos.length === 0) {
      return res.status(404).json({ message: "No hay pedidos activos" });
    }

    return res.status(200).json(pedidosActivos);
  } catch (error) {
    console.error("Error al obtener pedidos activos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  crearPedido,
  obtenerPedidos,
  deletePedido,
  recibirPedido,
  obtenerPedidoPorId,
  obtenerMaterialPorCodigo,
  EditEstado,
  obtenerPedidosActivos,
};
