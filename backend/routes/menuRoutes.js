// backend/routes/menuRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Menu = require("../models/Menu");
const router = express.Router();

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(403).json({ message: "Acesso negado" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token inválido" });
  }
};

// Rota para obter o cardápio
router.get("/menu", async (req, res) => {
  try {
    const menu = await Menu.find(); // Pega todos os menus
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: "Erro ao obter menu" });
  }
});

// Rota para editar o menu
router.put("/menu/:id", verifyToken, async (req, res) => {
  const { guarnicao1, guarnicao2, guarnicao3, guarnicao4 } = req.body;
  try {
    // Busca o menu pelo ID fornecido na URL
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu não encontrado" });
    }

    // Não permite que o campo 'dia' seja alterado. Ele permanece fixo.
    // Atualiza apenas as guarnições se fornecidas no corpo da requisição
    menu.guarnicao1 = guarnicao1 || menu.guarnicao1;
    menu.guarnicao2 = guarnicao2 || menu.guarnicao2;
    menu.guarnicao3 = guarnicao3 || menu.guarnicao3;
    menu.guarnicao4 = guarnicao4 || menu.guarnicao4;

    // Salva as alterações no banco de dados
    await menu.save();
    res.json(menu);  // Retorna o menu atualizado
  } catch (err) {
    res.status(500).json({ message: "Erro ao editar menu" });
  }
});

module.exports = router;
