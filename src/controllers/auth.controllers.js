const Usuarios = require("../models/usuarioModelo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const userLogin = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    let user = await Usuarios.findOne({ userEmail }).exec();

    if (!user) {
      return res.status(401).json({
        msg: "El email son incorrectos",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "la contraseña son incorrectos",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "Usuario logeado",
      token: token,
      user: {
        avatar: user.avatar || "",
        userName: user.userName || "Anonymous",
        userApellido: user.userApellido || "Anonymous",
        authority: [user.userCategoria || "USER"],
        email: user.userEmail,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un problema a la hora de iniciar sesión",
    });
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
  userLogin,
  obtenerUsuarios,
  DeleteUsuario,
  EditUsuario,
  obtenerUsuarioPorId,
};
