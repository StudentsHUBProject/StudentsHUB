const express = require("express");
const Corso = require("../../models/Corso");
const User = require("../../models/User");

const auth = require("../../middleware/auth");

const router = express.Router();

// Get Corsi

/**
 * @api {get} /api/corsi Get Corsi
 * @apiName GetCorsi
 * @apiGroup Corsi
 * 
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object[]} Corsi Lista di Corsi.
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
        _id: "62d08daa97394b719af94231",
        Nome: 'Lorenzo',
        Cognome: 'Test',
        Regione: 'Molise',
        Titolo_di_studio: 'Studente Universitario',
        Foto: 'data:image/jpeg;base64,..."
        Livello: 'Avanzato',
        Materia: 'Inglese',
        Lingua: 'Inglese',
        Lingua_Secondaria: 'Spagnolo',
        Modalita: [ 'on', null ],
        Prezzo: 11,
        Titolo: 'TEST',
        Descrizione: 'TESTESTEST',
        user: '62b9d2aba50006a382011241',
        email: 'admin1@admin.com',
        __v: 0
  }
 * ]
*/

router.get("/", (req, res) => {
  Corso.find({}, (err, corsi) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(corsi);
    }
  });
});

// Create corso
router.post("/FormTutor", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("email");
  Corso.create(
    { user: req.user.id, email: user.email, ...req.body },
    (err, corso) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(corso);
        console.log(corso)
      }
    }
  );
});

// Get corso by id

/**
 * @api {get} /api/corsi/SchedaTutor/:id Get Corso by ID
 * @apiName GetCorsoById
 * @apiGroup Corsi
 * 
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} id Id del Corso.
 * 
 * @apiParamExample {json} Request-Example:
  {
    "id": "62d08daa97394b719af94231"
  }

 * @apiSuccess {Object} Corso Corso.
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *    {
 *      _id: "62d08daa97394b719af94231",
        Nome: 'Lorenzo',
        Cognome: 'Test',
        Regione: 'Molise',
        Titolo_di_studio: 'Studente Universitario',
        Foto: 'data:image/jpeg;base64,..."
        Livello: 'Avanzato',
        Materia: 'Inglese',
        Lingua: 'Inglese',
        Lingua_Secondaria: 'Spagnolo',
        Modalita: [ 'on', null ],
        Prezzo: 11,
        Titolo: 'TEST',
        Descrizione: 'TESTESTEST',
        user: '62b9d2aba50006a382011241',
        email: 'admin1@admin.com',
        __v: 0
 *    }
*/

router.get("/SchedaTutor/:id", (req, res) => {
  Corso.findById(req.params.id, (err, corso) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(corso);
    }
  });
});

// Get Corso by multiple selectors

/**
 * @api {get} /api/corsi/SchedaTutor Get Corsi con Filtri
 * @apiName GetCorsiFiltri
 * @apiGroup Corsi
 * 
 * @apiVersion 1.0.0
 * 
 * @apiBody {String} [Materia] Materia insegnata dal corso (es. Matematica, Informatica, Inglese).
 * @apiBody {String} [Livello] Livello di preparazione adeguato per seguire il corso (es. Principiante, Avanzato).
 * @apiBody {String} [Regione] Regione in cui viene erogato il corso.
 * 
 * @apiParamExample {json} Request-Example:
  {
    "Materia": "Inglese",
    "Livello": "Avanzato",
    "Regione": "Molise" 
  }
 *
 * @apiSuccess {Object[]} Corsi lista di Corsi.
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
        _id: "62d08daa97394b719af94231",
        Nome: 'Lorenzo',
        Cognome: 'Test',
        Regione: 'Molise',
        Titolo_di_studio: 'Studente Universitario',
        Foto: 'data:image/jpeg;base64,..."
        Livello: 'Avanzato',
        Materia: 'Inglese',
        Lingua: 'Inglese',
        Lingua_Secondaria: 'Spagnolo',
        Modalita: [ 'on', null ],
        Prezzo: 11,
        Titolo: 'TEST',
        Descrizione: 'TESTESTEST',
        user: '62b9d2aba50006a382011241',
        email: 'admin1@admin.com',
        __v: 0
  }
 * ]
*/

router.get("/SchedaTutor", (req, res) => {
  let filters = req.query;

  let query = {
    Materia: filters.Materia || { $exists: true },
    Livello: filters.Livello || { $exists: true },
    Regione: filters.Regione || { $exists: true },
  };

  Corso.find(query, (err, corso) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(corso);
    }
  });
});

// Delete corso
router.delete("/:id", auth, async (req, res) => {
  try {
    const corso = await Corso.findById(req.params.id).select("user");
    if (corso.user === req.user.id) {
      Corso.findByIdAndRemove(req.params.id, (err, corso) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(corso);
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
