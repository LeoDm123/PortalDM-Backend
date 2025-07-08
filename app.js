const express = require("express");
const { dbConnection } = require("./src/database/config");
const app = express();
const cors = require("cors");

const allowedOrigins = [process.env.DEV_DOM, process.env.API_FRONT];

require("dotenv").config();

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

dbConnection();

app.use("/auth", require("./src/routes/auth"));
app.use("/clients", require("./src/routes/clients"));
app.use("/pres", require("./src/routes/pres"));
app.use("/presPuertas", require("./src/routes/presPuertas"));
app.use("/pay", require("./src/routes/pay"));
app.use("/pedidoPerfiles", require("./src/routes/pedidoPerfiles"));
app.use("/pedidoHerrajes", require("./src/routes/pedidoHerrajes"));
app.use("/pedidoVidrios", require("./src/routes/pedidoVidrios"));
app.use("/pedidoMadera", require("./src/routes/pedidoMadera"));
app.use("/pedidoVarios", require("./src/routes/pedidoVarios"));
app.use("/mats", require("./src/routes/mats"));
app.use("/inv", require("./src/routes/inv"));
app.use("/settings", require("./src/routes/settings"));
app.use("/costos", require("./src/routes/costos"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
