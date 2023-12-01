const express = require("express");
const { dbConnection } = require("./src/database/config");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(express.json());

app.use(cors());

dbConnection();

app.use("/auth", require("./src/routes/auth"));
app.use("/clients", require("./src/routes/clients"));
app.use("/pres", require("./src/routes/pres"));
app.use("/pay", require("./src/routes/pay"));
app.use("/pedidoPerfiles", require("./src/routes/pedidoPerfiles"));
app.use("/pedidoHerrajes", require("./src/routes/pedidoHerrajes"));
app.use("/pedidoVidrios", require("./src/routes/pedidoVidrios"));
app.use("/pedidoMadera", require("./src/routes/pedidoMadera"));
app.use("/pedidoVarios", require("./src/routes/pedidoVarios"));
app.use("/mats", require("./src/routes/mats"));
app.use("/inv", require("./src/routes/inv"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
