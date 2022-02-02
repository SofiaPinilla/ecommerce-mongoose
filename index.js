const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { MONGO_URI } = require("./config/keys");
const PORT = 3000;

app.use(express.json());

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("conectado a mongoDB con éxito"))
  .catch((err) => console.error(err));

app.use('/products',require('./routes/products'))
app.use('/users',require('./routes/users'))
app.use('/orders',require('./routes/orders'))

app.listen(PORT, console.log(`Servidor levantado en el puerto ${PORT}`));
