const mongoose = require("mongoose");

const Userschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlenght: [
        2,
        "Il nome utente non puo essere più piccolo di 2 caratteri",
      ],
      maxlength: [
        64,
        "il nome utente non puo essere più grande di 64 caratteri",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    collection: "Users",
  }
);

module.exports = mongoose.model("Libro", Userschema);
