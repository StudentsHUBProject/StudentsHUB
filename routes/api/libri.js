const express = require("express");
const Libro = require("../../models/Libro");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

const router = express.Router();

/**
 * @api {get} /api/libri Get Libri
 * @apiName GetLibri
 * @apiGroup Libri
 * 
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object[]} Libri Lista di Libri.
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
 *      "_id": "628e46a10e84fb60153b974c",
 *      "user": "628dffc51521d1461f798027",
 *      "titolo": "analisi 1",
 *      "descrizione": "Vendo libro usato di analisi 1 in ottime condizioni. Gli argomenti trattati vanno dalle derivate agli integrali doppi.",
 *      "email": "roberto@gmail.com",
 *      "materia": "matematica",
 *      "prezzo": 30,
 *      "immagine": "data:image/jpeg;base64,...",
 *      "created_at": "2022-05-25T15:09:21.266+00:00",
 *      "__v": 0
 *    },
 *    {
 *      "_id": "628e470f0e84fb60153b975c",
 *      "user": "628dffc51521d1461f798027",
 *      "titolo": "b2 inglese",
 *      "descrizione": "Vendo libro usato del b2 di inglese perfetto per esercitarsi per prove dell'esame sia scritto con vari esercizi che orali con un cd incluso.",
 *      "email": "roberto@gmail.com",
 *      "materia": "inglese",
 *      "prezzo": 25,
 *      "immagine": "data:image/jpeg;base64,...",
 *      "created_at": "2022-05-25T15:11:11.257+00:00",
 *      "__v": 0
 *    }
 * ]
*/

// Get libri
router.get("/", (req, res) => {
  Libro.find({}, (err, libri) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(libri);
    }
  });
});

/**
 * @api {get} /api/libri/materie-prezzo Get Libri con filtri
 * @apiName GetLibriFiltri
 * @apiGroup Libri
 * 
 * @apiVersion 1.0.0
 * 
 * @apiBody {String} [materia] Materia di cui tratta il libro. (es. storia, informatica, matematica)
 * @apiBody {Number} [prezzo] Prezzo massimo della ricerca.
 * 
 * @apiParamExample {json} Request-Example:
  {
    "materia": "matematica",
    "prezzo": 30
  }
 *
 * @apiSuccess {Object[]} Libri Lista di Libri.
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
 *      "_id": "628e46a10e84fb60153b974c",
 *      "user": "628dffc51521d1461f798027",
 *      "titolo": "analisi 1",
 *      "descrizione": "Vendo libro usato di analisi 1 in ottime condizioni. Gli argomenti trattati vanno dalle derivate agli integrali doppi.",
 *      "email": "roberto@gmail.com",
 *      "materia": "matematica",
 *      "prezzo": 30,
 *      "immagine": "data:image/jpeg;base64,...",
 *      "created_at": "2022-05-25T15:09:21.266+00:00",
 *      "__v": 0
 *    },
 *    {
 *      "_id": "628e470f0e84fb60153b975c",
 *      "user": "628dffc51521d1461f798027",
 *      "titolo": "b2 inglese",
 *      "descrizione": "Vendo libro usato del b2 di inglese perfetto per esercitarsi per prove dell'esame sia scritto con vari esercizi che orali con un cd incluso.",
 *      "email": "roberto@gmail.com",
 *      "materia": "inglese",
 *      "prezzo": 25,
 *      "immagine": "data:image/jpeg;base64,...",
 *      "created_at": "2022-05-25T15:11:11.257+00:00",
 *      "__v": 0
 *    }
 * ]
*/

// Get libro per filtri materia e prezzo
router.get("/materie-prezzo", (req, res) => {
  let filters = req.query;

  let query;

  query = {
    materia: filters.materia || { $exists: true },
    prezzo: filters.prezzo != 0 ? { $lte: filters.prezzo } : { $exists: true },
  };

  Libro.find(query, (err, libri) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(libri);
    }
  });
});

/**
 * @api {get} /api/libri/:id Get Libro
 * @apiName GetLibroById
 * @apiGroup Libri
 * 
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} id Id del libro.
 * 
 * @apiParamExample {json} Request-Example:
  {
    "id": "628e46a10e84fb60153b974c"
  }

 * @apiSuccess {Object} Libro Libro.
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *    {
 *      "_id": "628e46a10e84fb60153b974c",
 *      "user": "628dffc51521d1461f798027",
 *      "titolo": "analisi 1",
 *      "descrizione": "Vendo libro usato di analisi 1 in ottime condizioni. Gli argomenti trattati vanno dalle derivate agli integrali doppi.",
 *      "email": "roberto@gmail.com",
 *      "materia": "matematica",
 *      "prezzo": 30,
 *      "immagine": "data:image/jpeg;base64,...",
 *      "created_at": "2022-05-25T15:09:21.266+00:00",
 *      "__v": 0
 *    }
*/

//Get libro by id
router.get("/:id", (req, res) => {
  Libro.findById(req.params.id, (err, libro) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(libro);
    }
  });
});

//Post per la creazione del libro
router.post("/crea-libro", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("email");
  Libro.create(
    { user: req.user.id, email: user.email, ...req.body },
    (err, libro) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(libro);
      }
    }
  );
});

/**
 * @api {get} /api/libri/search/:titolo Get Libri in base al titolo
 * @apiName GetLibriTitolo
 * @apiGroup Libri
 * 
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} titolo Titolo del libro.
 * 
 * @apiParamExample {json} Request-Example:
  {
    "titolo": "analisi 1"
  }

 * @apiSuccess {Object[]} Libri Lista di Libri.
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *    {
 *      "_id": "628e46a10e84fb60153b974c",
 *      "user": "628dffc51521d1461f798027",
 *      "titolo": "analisi 1",
 *      "descrizione": "Vendo libro usato di analisi 1 in ottime condizioni. Gli argomenti trattati vanno dalle derivate agli integrali doppi.",
 *      "email": "roberto@gmail.com",
 *      "materia": "matematica",
 *      "prezzo": 30,
 *      "immagine": "data:image/jpeg;base64,...",
 *      "created_at": "2022-05-25T15:09:21.266+00:00",
 *      "__v": 0
 *    },
 *    {
 *      "_id": "628e46a10e84fb60153b978c",
 *      "user": "628e47760e84fb60153b976a",
 *      "titolo": "analisi 1",
 *      "descrizione": "Vendo libro usato di analisi 1 in buone condizioni. Parte da una spiegazione sugli insiemi numerici per poi andare allo studio delle funzioni,derivate,integrali e infine si arriva alle equazioni differenziali",
 *      "email": "marco@gmail.com",
 *      "materia": "matematica",
 *      "prezzo": 26,
 *      "immagine": "data:image/jpeg;base64,...",
 *      "created_at": "2022-04-21T15:18:43.266+00:00",
 *      "__v": 0
 *    }
 * ]
*/

//Get per la search dei titoli dei libri
router.get("/search/:titolo", (req, res) => {
  const { titolo } = req.params;
  Libro.find({ titolo: titolo }, (err, libri) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(libri);
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
          res.status(400).send(err);
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
