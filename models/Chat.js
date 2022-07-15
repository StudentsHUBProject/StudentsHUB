const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    partecipanti: [{ type: String, required: true }],
    messaggi: [{
      data: { type: Date, default: Date.now },
      testo: { type: String, required: true },
      inviato_da: { type: String, required: true },
    }],
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: "Chat",
  }
);

module.exports = mongoose.model("Chat", schema);
