const mongoose = require("mongoose");

const Corsoschema = mongoose.Schema(
  {
    Nome: { type: String, required: true },
    Cognome: { type: String },
    Regione: { type: String, required: true },
    Titolo_di_studio: { type: String, required: true },
    Foto: { type: String, required: true },
    Livello: { type: String, required: true },
    Materia: { type: String, required: true },
    Lingua: { type: String, required: true },
    Lingua_Secondaria: { type: String },
    Modalita: { type: Array, required: true },
    Prezzo: { type: Number, required: true, default: 1 },
    Titolo: { type: String, required: true },
    Descrizione: { type: String, required: true },
    user: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    collection: "Corsi",
  }
);

module.exports = mongoose.model("Corso", Corsoschema);
