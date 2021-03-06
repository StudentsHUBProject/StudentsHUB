const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user: { type: String, required: true },
    email: { type: String, required: true },
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true },
    tipologia: { type: String, required: true },
    prezzo: { type: Number, required: true },
    caparra: { type: Number, default: 0 },
    utenze_medie: { type: Number, default: 0 },
    contratto: { type: Number, default: 0 },
    metri_quadri: { type: Number, default: 0 },
    restrizioni: { type: String, default: "" },
    indirizzo: { type: String, required: true },
    citta: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    posti_letto: { type: Number, required: true },
    classe_energetica: { type: String, default: "" },
    riscaldamento: { type: String, default: "" },
    internet: { type: Boolean, default: false },
    animali_domestici: { type: Boolean, default: false },
    televisione: { type: Boolean, default: false },
    aria_condizionata: { type: Boolean, default: false },
    fumatori_ammessi: { type: Boolean, default: false },
    ascensore: { type: Boolean, default: false },
    lavatrice: { type: Boolean, default: false },
    asciugatrice: { type: Boolean, default: false },
    accesso_disabili: { type: Boolean, default: false },
    immagini: [{ type: String, default: "" }],
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: "Appartamenti",
  }
);

module.exports = mongoose.model("Appartamento", schema);
