const Usuarios = require("../models/usuarioModelo");
const bcrypt = require("bcrypt");

const crearUsuario = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let usuario = await Usuarios.findOne({ email });
    console.log(usuario);

    if (usuario) {
      return res.json({
        msg: "El email que intenta registrase ya existe",
      });
    }

    usuario = new Usuarios(req.body);

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.json({
      msg: "Usuario Registrado",
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    let usuario = await Usuarios.findOne({ email });

    if (!usuario) {
      return res.json({
        msg: "El Email o la contraseña es incorrectas",
      });
    }

    const validarPassword = bcrypt.compareSync(password, usuario.password);

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

module.exports = {
  crearUsuario,
  loginUsuario,
};
