const mongoose = require("mongoose")

const schema = mongoose.Schema({
	titolo: String,
	descrizione: String,
	tipologia: String,
	prezzo: Number,
	metri_quadri: Number,
	numero_stanze: Number,
	numero_bagni: Number
})

module.exports = mongoose.model("Appartamento", schema)