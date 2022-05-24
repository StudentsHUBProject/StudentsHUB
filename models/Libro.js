const mongoose = require("mongoose");

const libriSchema = new mongoose.Schema({
  immagine: { type: String, required: true },
  materia: { type: String, required: true },
  titolo: { type: String, required: true },
  descrizione: { type: String, required: true },
  prezzo: { type: Number, required: true },
  user: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Libro", libriSchema);
