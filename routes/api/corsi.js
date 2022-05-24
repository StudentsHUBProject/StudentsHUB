const express = require("express");
const Corso = require("../../models/Corso");

const auth = require("../../middleware/auth");

const router = express.Router();

// Get Corsi
router.get("/", (req, res) => {
  Corso.find({}, (err, corsi) => {
    if (err) {
      res.send(err);
    }
    res.json(corsi);
  });
});

// Create Corso
router.post("/FormTutor", auth, async (req, res) => {
  req.body.Utente = req.user.id;

  Corso.create(req.body, (err, corso) => {
    if (err) {
      res.send(err);
    }
    res.json(corso);
  });
});

// Get appartamento by id
router.get("/SchedaTutor/:id", (req, res) => {
  Corso.findById(req.params.id, (err, corso) => {
    if (err) {
      res.send(err);
    }
    res.json(corso);
  });
});

// Get Corso by multiple selectors
router.get("/SchedaTutor", (req, res) => {
  let filters = req.query;

  let query = {
    Materia: filters.Materia || { $exists: true },
    Livello: filters.Livello || { $exists: true },
    Regione: filters.Regione || { $exists: true },
  };

  Corso.find(query, (err, corso) => {
    if (err) {
      res.send(err);
    }
    res.json(corso);
  });
});

module.exports = router;
