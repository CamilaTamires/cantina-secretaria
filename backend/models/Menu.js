// backend/models/Menu.js
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  dia: { type: String, required: true },
  guarnicao1: { type: String, default: " " },
  guarnicao2: { type: String, default: " " },
  guarnicao3: { type: String, default: " " },
  guarnicao4: { type: String, default: " " },
});

module.exports = mongoose.model("Menu", menuSchema);
