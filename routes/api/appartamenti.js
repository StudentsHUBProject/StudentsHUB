const express = require("express");
const Appartamento = require("../../models/Appartamento");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

const router = express.Router();

/**
 * @api {get} /api/appartamenti/ Get Appartamenti
 * @apiName GetAppartamenti
 * @apiGroup Appartamenti
 * 
 * @apiVersion 1.0.0
 * 
 * @apiBody {String} [tipologia] Tipologia di appartamento. (es. singola, doppia, tripla, appartamento)
 * @apiBody {Number} [prezzo] Prezzo massimo della ricerca.
 * @apiBody {Number} [posti_letto] Numero minimo di posti letto.
 * @apiBody {String} [citta] Città.
 * @apiBody {String} [classe_energetica] Tipologia di classe energetica. (es. A, B, C, D, E, F, G)
 * @apiBody {Number} [contratto] Tipologia di classe energetica. (Numero da 1 a 8).
 * @apiBody {String} [restrizioni] Restrizioni dell'annuncio. (es. "solo ragazze", "solo ragazzi")
 * @apiBody {String} [riscaldamento] Topologia di riscaldamento. (es. Autonomo, Centralizzato)
 * @apiBody {Boolean} [internet] Presenza di internet. (es. true, false)
 * @apiBody {Boolean} [fumatori_ammessi] Fumatori ammessi. (es. true, false)
 * @apiBody {Boolean} [ascensore] Presenza dell'ascensore. (es. true, false)
 * @apiBody {Boolean} [animali_domestici] Animali domestici ammessi. (es. true, false)
 * @apiBody {Boolean} [lavatrice] Presenza della lavatrice. (es. true, false)
 * @apiBody {Boolean} [asciugatrice] Presenza dell'asciugatrice. (es. true, false)
 * @apiBody {Boolean} [televisione] Presenza della televisione. (es. true, false)
 * @apiBody {Boolean} [aria_condizionata] Presenza dell'aria condizionata. (es. true, false)
 * @apiBody {Boolean} [accesso_disabili] Presenza accesso per i disabili. (es. true, false)
 * 
 * @apiParamExample {json} Request-Example:
  {
    "tipologia": "appartamento",
    "prezzo": 400,
    "posti_letto": 1,
    "citta": "roma",
    "classe_energetica": "A",
    "contratto": 2,
    "restrizioni": "Solo Ragazze",
    "riscaldamento": "Autonomo",
    "internet": true,
    "fumatori_ammessi": false,
    "ascensore": true,
    "animali_domestici": true,
    "lavatrice": true,
    "asciugatrice": false,
    "televisione": false,
    "aria_condizionata": false,
    "accesso_disabili": true
  }
 *
 * @apiSuccess {Object[]} appartamenti Lista di Appartamenti.
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
 *      "_id": "628e4e389c5fdf202f0a2db0",
 *      "user": "628ccd19f98cfd97bfcaff4a",
 *      "email": "ersi@studentshub.it",
 *      "titolo": "Camera Singola - Viale Ippocrate 140, Roma",
 *      "descrizione": "Stanza singola in un appartamento condiviso, composto da 4 camere e 2 bagni. Stanza di circa 25 mq con un letto matrimoniale e una scrivania. Con parcheggio bici, televisione, wifi, lavastoviglie, lavatrice. Classe energetica: F, IPE 135.89 Kwh/mq anno.",
 *      "tipologia": "singola",
 *      "prezzo": 660,
 *      "caparra": 500,
 *      "utenze_medie": null,
 *      "contratto": 1,
 *      "metri_quadri": 25,
 *      "restrizioni": "ragazzi",
 *      "indirizzo": "Viale Ippocrate 140, Roma, 00161 (RM)",
 *      "citta": "Roma",
 *      "lat": 41.90699350000001,
 *      "lng": 12.5174275,
 *      "posti_letto": 1,
 *      "classe_energetica": "F",
 *      "riscaldamento": "autonomo",
 *      "internet": true,
 *      "animali_domestici": true,
 *      "televisione": true,
 *      "aria_condizionata": true,
 *      "fumatori_ammessi": true,
 *      "ascensore": false,
 *      "lavatrice": true,
 *      "asciugatrice": false,
 *      "accesso_disabili": false,
 *      "immagini": [
 *          "data:image/jpeg;base64,...",
 *          "data:image/jpeg;base64,...",
 *          "data:image/jpeg;base64,..."
 *      ],
 *      "created_at": "2022-05-25T15:32:48.050Z",
 *      "__v": 0
 *    },
 *    {
 *      "_id": "628e35809c5fdf202f0a2cea",
 *      "user": "628ccd19f98cfd97bfcaff4a",
 *      "email": "ersi@studentshub.it",
 *      "titolo": "Camera Doppia - Via di Bravetta 91, Roma",
 *      "descrizione": "Affittasi Camera Doppia a Roma, Via di Bravetta 91 per 650 Euro al mese. Bagno privato con doccia. Soggiorno e terrazzo in comune. Vicino a tutti i servizi e alle fermate autobus. Metro Cornelia a 2 km. Disponibile dal 10/4/2022. Sono disponibili i seguenti servizi: televisione, ascensore, lavatrice. Contratto offerto: Contratto transitorio. Riscaldamento Autonomo.",
 *      "tipologia": "doppia",
 *      "prezzo": 650,
 *      "caparra": 650,
 *      "utenze_medie": 50,
 *      "contratto": 2,
 *      "metri_quadri": 60,
 *      "restrizioni": "",
 *      "indirizzo": "Via di Bravetta 91, Roma, 00164 (RM)",
 *      "citta": "Roma",
 *      "lat": 41.8852207,
 *      "lng": 12.4234162,
 *      "posti_letto": 2,
 *      "classe_energetica": "",
 *      "riscaldamento": "autonomo",
 *      "internet": true,
 *      "animali_domestici": false,
 *      "televisione": false,
 *      "aria_condizionata": false,
 *      "fumatori_ammessi": false,
 *      "ascensore": true,
 *      "lavatrice": true,
 *      "asciugatrice": false,
 *      "accesso_disabili": true,
 *      "immagini": [
 *          "data:image/jpeg;base64,...",
 *          "data:image/jpeg;base64,...",
 *          "data:image/jpeg;base64,..."
 *      ],
 *      "created_at": "2022-05-25T15:32:48.050Z",
 *      "__v": 0
 *    }
 * ]
*/
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

  Appartamento.find(query)
    .sort({ created_at: "desc" })
    .exec((err, appartamenti) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(appartamenti);
      }
    });
});

/**
 * @api {get} /api/appartamenti/:id Get Appartamento by ID
 * @apiName GetAppartamento
 * @apiGroup Appartamenti
 * 
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} id ID dell'appartamento.
 * 
 * @apiParamExample {json} Request-Example:
  {
    "id": "628e4e389c5fdf202f0a2db0"
  }
 *
 * @apiSuccess {Object} appartamento Appartamento.
 * 
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "628e4e389c5fdf202f0a2db0",
 *      "user": "628ccd19f98cfd97bfcaff4a",
 *      "email": "ersi@studentshub.it",
 *      "titolo": "Camera Singola - Viale Ippocrate 140, Roma",
 *      "descrizione": "Stanza singola in un appartamento condiviso, composto da 4 camere e 2 bagni. Stanza di circa 25 mq con un letto matrimoniale e una scrivania. Con parcheggio bici, televisione, wifi, lavastoviglie, lavatrice. Classe energetica: F, IPE 135.89 Kwh/mq anno.",
 *      "tipologia": "singola",
 *      "prezzo": 660,
 *      "caparra": 500,
 *      "utenze_medie": null,
 *      "contratto": 1,
 *      "metri_quadri": 25,
 *      "restrizioni": "ragazzi",
 *      "indirizzo": "Viale Ippocrate 140, Roma, 00161 (RM)",
 *      "citta": "Roma",
 *      "lat": 41.90699350000001,
 *      "lng": 12.5174275,
 *      "posti_letto": 1,
 *      "classe_energetica": "F",
 *      "riscaldamento": "autonomo",
 *      "internet": true,
 *      "animali_domestici": true,
 *      "televisione": true,
 *      "aria_condizionata": true,
 *      "fumatori_ammessi": true,
 *      "ascensore": false,
 *      "lavatrice": true,
 *      "asciugatrice": false,
 *      "accesso_disabili": false,
 *      "immagini": [
 *          "data:image/jpeg;base64,...",
 *          "data:image/jpeg;base64,...",
 *          "data:image/jpeg;base64,..."
 *      ],
 *      "created_at": "2022-05-25T15:32:48.050Z",
 *      "__v": 0
 *    }
*/
router.get("/:id", (req, res) => {
  Appartamento.findById(req.params.id, (err, appartamento) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(appartamento);
    }
  });
});

/**
 * @api {get} /api/appartamenti/map/coordinate Get Coordinate degli Appartamenti
 * @apiName GetCoordinate
 * @apiGroup Appartamenti
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} coordinate Lista di coordinate degli appartamenti.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *  {
 *    "_id": "628e35809c5fdf202f0a2cea",
 *    "titolo": "Camera Doppia - Via di Bravetta 91, Roma",
 *    "lat": 41.8852207,
 *    "lng": 12.4234162
 *  },
 *  {
 *    "_id": "628e4c209c5fdf202f0a2d9b",
 *    "titolo": "Camera Singola - Via Pantigliate, Milano",
 *    "lat": 45.46004629999999,
 *    "lng": 9.1314533
 *  },
 *  {
 *    "_id": "628e4e389c5fdf202f0a2db0",
 *    "titolo": "Camera Singola - Viale Ippocrate 140, Roma",
 *    "lat": 41.90699350000001,
 *    "lng": 12.5174275
 *  }
 * ]
 */
router.get("/map/coordinate", (req, res) => {
  Appartamento.find({}, "titolo lat lng", (err, appartamenti) => {
    if (err) {
      res.status(400).send(err);
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
        res.status(400).send(err);
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
          res.status(400).send(err);
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
