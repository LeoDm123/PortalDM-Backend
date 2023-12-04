const Usuarios = require("../models/usuarioModelo");
const bcrypt = require("bcrypt");

const crearUsuario = async (req, res) => {
  const {
    userName,
    userApellido,
    userDNI,
    userTelefono,
    userDireccion,
    userEmail,
    userPassword,
  } = req.body;

  console.log("REQ:", req.body);

  try {
    let usuario = await Usuarios.findOne({
      $or: [{ userEmail: userEmail }, { userDNI: userDNI }],
    });
    console.log("USER:", usuario);

    if (usuario) {
      return res.json({
        msg: "El usuario que intenta registrar ya existe",
      });
    }

    let newUsuario = new Usuarios(req.body);

    const salt = bcrypt.genSaltSync(10);
    newUsuario.userPassword = bcrypt.hashSync(userPassword, salt);

    await newUsuario.save();

    res.json({
      msg: "Usuario Registrado",
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    let usuario = await Usuarios.findOne({ userEmail });

    if (!usuario) {
      return res.json({
        msg: "El Email o la contraseña es incorrectas",
      });
    }

    const validarPassword = bcrypt.compareSync(
      userPassword,
      usuario.userPassword
    );

    if (!validarPassword) {
      res.json({
        msg: "El email o la contraseña es incorrectos",
      });
    }

    res.json({
      msg: "Usuario logueado",
    });
  } catch (error) {
    console.log(error);
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.find();

    if (!usuarios) {
      return res.status(404).json({ message: "Currency data not found" });
    }

    return res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteUsuario = async (req, res) => {
  try {
    const deletedUser = await Usuarios.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const EditUsuario = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;
    console.log(updatedUserData);

    const updatedUser = await Usuarios.findByIdAndUpdate(
      userId,
      updatedUserData,
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Error al editar el usuario:", error);
    res.status(500).json({ error: "Error al editar el usuario" });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Usuario.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  crearUsuario,
  loginUsuario,
  obtenerUsuarios,
  DeleteUsuario,
  EditUsuario,
  obtenerUsuarioPorId,
};
