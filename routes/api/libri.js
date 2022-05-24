const express = require("express");
const Libro = require("../../models/Libro");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

const router = express.Router();

// Get libri
router.get("/", (req, res) => {
  Libro.find({}, (err, libro) => {
    if (err) {
      res.send(err);
    } else {
      res.json(libro);
    }
  });
});

// Get libro per filtri materia e prezzo
router.get("/materie-prezzo", (req, res) => {
  let filters = req.query;

  let query;

  query = {
    materia: filters.materia || { $exists: true },
    prezzo: filters.prezzo != 0 ? { $lte: filters.prezzo } : { $exists: true },
  };

  Libro.find(query, (err, libro) => {
    if (err) {
      res.send(err);
    } else {
      res.json(libro);
    }
  });
});

//get libro by id
router.get("/:id", (req, res) => {
  Libro.findById(req.params.id, (err, libro) => {
    if (err) {
      res.send(err);
    } else {
      res.json(libro);
    }
  });
});

//post per la creazione del libro
router.post("/crea-libro", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("email");
  Libro.create(
    { user: req.user.id, email: user.email, ...req.body },
    (err, libro) => {
      if (err) {
        res.send(err);
      } else {
        res.json(libro);
      }
    }
  );
});

//get per la search dei titoli dei libri
router.get("/search/:titolo", (req, res) => {
  const { titolo } = req.params;
  Libro.find({ titolo: titolo }, (err, libro) => {
    if (err) {
      res.send(err);
    } else {
      res.json(libro);
    }
  });
});

// Delete libro
router.delete("/:id", auth, async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id).select("user");
    if (libro.user === req.user.id) {
      Libro.findByIdAndRemove(req.params.id, (err, libro) => {
        if (err) {
          res.send(err);
        } else {
          res.json(libro);
        }
      });
    } else {
      res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
