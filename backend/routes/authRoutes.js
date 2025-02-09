// backend/routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Rota de login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    // Verificação simples da senha
    if (user.password !== password) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;
