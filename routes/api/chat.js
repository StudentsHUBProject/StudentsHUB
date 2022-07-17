const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Chat = require("../../models/Chat");

// GET chat tra 2 utenti
router.get("/", auth, (req, res) => {
  if (req.user.id == req.query.user) return res.status(400).send("You can't chat with yourself");
  
  Chat.find({partecipanti: {$all: [req.user.id, req.query.user]}}, (err, chat) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(chat);
    }
  });
});

// POST crea chat tra 2 utenti
router.post("/", auth, (req, res) => {
  if (req.user.id == req.body.user) return res.status(400).json("Non puoi creare una chat con te stesso");

  // controlla se esiste l'utente
  User.findById(req.body.user, (err, user) => {
    if (!user) return res.status(400).send("Utente non trovato");
  });

  // controlla se esiste la chat
  Chat.find({partecipanti: {$all: [req.user.id, req.body.user]}}, (err, chat) => {
    if (chat.length > 0) return res.json({status: "La chat esiste già"});

    const new_chat = new Chat({
      partecipanti: [req.user.id, req.body.user],
    });

    new_chat.save((err, chat) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(chat);
      }
    });
  });
});

module.exports = router;