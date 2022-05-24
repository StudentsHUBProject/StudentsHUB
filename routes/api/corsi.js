const express = require("express");
const Corso = require("../../models/Corso");
const User = require("../../models/User")

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

// Create appartamento
router.post("/FormTutor", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("email");
  Corso.create(
    { user: req.user.id, email: user.email, ...req.body },
    (err, corso) => {
      if (err) {
        res.send(err);
      }
      res.json(corso);
    }
  );
});

/** 
router.post("/FormTutor", auth, async(req, res) => {
	//Aggiungi email utente al corso
	const user = await User.findById(req.user.id).select('email')
	req.body.user = user.email;

	Corso.create(req.body, (err, corso) => {
		if (err) {
			res.send(err);
		}
		res.json(corso);
	});
});
**/
// Get corso by id
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

// Delete appartamento
router.delete("/:id", auth, async (req, res) => {
  try {
    const corso = await Corso.findById(req.params.id).select(
      "user"
    );
    if (corso.user === req.user.id) {
      Corso.findByIdAndRemove(req.params.id, (err, corso) => {
        if (err) {
          res.send(err);
        }
        res.json(corso);
      });
    } else {
      res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
