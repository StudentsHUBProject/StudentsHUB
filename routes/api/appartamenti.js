const express = require("express");
const Appartamento = require("../../models/Appartamento");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

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
    } else {
      res.json(appartamenti);
    }
  });
});

// Get appartamento by id
router.get("/:id", (req, res) => {
  Appartamento.findById(req.params.id, (err, appartamento) => {
    if (err) {
      res.send(err);
    } else {
      res.json(appartamento);
    }
  });
});

// Get coordinate
router.get("/map/coordinate", (req, res) => {
  Appartamento.find({}, "titolo lat lng", (err, appartamenti) => {
    if (err) {
      res.send(err);
    } else {
      res.json(appartamenti);
    }
  });
});

// Create appartamento
router.post("/", auth, async (req, res) => {
  if (req.body.immagini.lenght > 8) {
    return res.json({
      error: "Too many images",
    });
  }

  const user = await User.findById(req.user.id).select("email");
  Appartamento.create(
    { user: req.user.id, email: user.email, ...req.body },
    (err, appartamento) => {
      if (err) {
        res.send(err);
      } else {
        res.json(appartamento);
      }
    }
  );
});

// Delete appartamento
router.delete("/:id", auth, async (req, res) => {
  try {
    const appartamento = await Appartamento.findById(req.params.id).select(
      "user"
    );
    if (appartamento.user === req.user.id) {
      Appartamento.findByIdAndRemove(req.params.id, (err, appartamento) => {
        if (err) {
          res.send(err);
        } else {
          res.json(appartamento);
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
