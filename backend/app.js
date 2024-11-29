// backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar ao MongoDB", err));

// Usar as rotas
app.use("/api/auth", authRoutes);
app.use("/api", menuRoutes);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
