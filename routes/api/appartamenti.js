const express = require("express");
const Appartamento = require("../../models/Appartamento");
const router = express.Router();

// Get appartamenti con filtri
router.get("/", (req, res) => {
  let filters = req.query;
  let query = {};

  if (Object.keys(filters).length !== 0) {
    query = {
      tipologia: filters.tipologia || { $exists: true },
      prezzo:
        filters.prezzo != 0 ? { $lte: filters.prezzo } : { $exists: true },
      posti_letto: { $gte: filters.posti_letto } || { $exists: true },
      citta: filters.citta || { $exists: true },
      classe_energetica: filters.classe_energetica || { $exists: true },
      contratto: filters.contratto || { $exists: true },
      restrizioni: filters.restrizioni || { $exists: true },
      riscaldamento: filters.riscaldamento || { $exists: true },
      internet: filters.internet || { $exists: true },
      fumatori_ammessi: filters.fumatori_ammessi || { $exists: true },
      ascensore: filters.ascensore || { $exists: true },
      animali_domestici: filters.animali_domestici || { $exists: true },
      lavatrice: filters.lavatrice || { $exists: true },
      asciugatrice: filters.asciugatrice || { $exists: true },
      televisione: filters.televisione || { $exists: true },
      aria_condizionata: filters.aria_condizionata || { $exists: true },
      accesso_disabili: filters.accesso_disabili || { $exists: true },
    };
  }

  Appartamento.find(query, (err, appartamenti) => {
    if (err) {
      res.send(err);
    }
    res.json(appartamenti);
  });
});

// Get appartamento by id
router.get("/:id", (req, res) => {
  Appartamento.findById(req.params.id, (err, appartamento) => {
    if (err) {
      res.send(err);
    }
    res.json(appartamento);
  });
});

// Get coordinate
router.get("/map/coordinate", (req, res) => {
  Appartamento.find({}, "titolo lat lng", (err, appartamenti) => {
    if (err) {
      res.send(err);
    }
    res.json(appartamenti);
  });
});

// Create appartamento
router.post("/", (req, res) => {
  Appartamento.create(req.body, (err, appartamento) => {
    if (err) {
      res.send(err);
    }
    res.json(appartamento);
  });
});

// Update appartamento
router.patch("/:id", (req, res) => {
  Appartamento.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, appartamento) => {
      if (err) {
        res.send(err);
      }
      res.json(appartamento);
    }
  );
});

// Delete appartamento
router.delete("/:id", (req, res) => {
  Appartamento.findByIdAndRemove(req.params.id, (err, appartamento) => {
    if (err) {
      res.send(err);
    }
    res.json(appartamento);
  });
});

module.exports = router;