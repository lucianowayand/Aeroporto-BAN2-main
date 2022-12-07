const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const aviaoRouter = require("./routes/aviao");
const modeloRouter = require("./routes/modelo");
const empregadoRouter = require("./routes/empregado");
const controladorRouter = require("./routes/controladorAereo");
const testeRouter = require("./routes/teste");
const periciaRouter = require("./routes/modeloHasTecnico");
const testaRouter = require("./routes/testa");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/aviao", aviaoRouter);

app.use("/modelo", modeloRouter);

app.use("/empregado", empregadoRouter);

app.use("/controlador", controladorRouter);

app.use("/teste", testeRouter);

app.use("/pericia", periciaRouter);

app.use("/testa", testaRouter);

app.listen(5000, () =>
  console.log("REST API server ready at: http://localhost:5000")
);
