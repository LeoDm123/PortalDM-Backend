const Pedidos = require("../models/pedidoModelo");

const crearPedido = async (req, res) => {
  const { Obra, Fecha, NroPedido, OrdenCompra, Materiales } = req.body;

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

module.exports = { crearPedido, obtenerPedidos };
