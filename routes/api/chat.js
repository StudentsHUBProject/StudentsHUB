const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Chat = require("../../models/Chat");

// GET chat tra 2 utenti
router.get("/", auth, async (req, res) => {
  if (req.user.id == req.query.user) return res.status(400).send("You can't chat with yourself");
  
  Chat.find({partecipanti: {$all: [req.user.id, req.query.user]}}, (err, chat) => {
    if (err) {
      res.status(400).send(err);
    }
    res.json(chat);
  });
});

module.exports = router;