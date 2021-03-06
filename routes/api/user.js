const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); //Genera Token
const bcrypt = require("bcryptjs"); //encrypt password
const { check, validationResult } = require("express-validator"); //Check validità richieste
const gravatar = require("gravatar"); //prende avatar dall'email
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Appartamento = require("../../models/Appartamento");
const Libro = require("../../models/Libro");
const Corso = require("../../models/Corso");
const Chat = require("../../models/Chat");

//POST api/user/
//desc get user info
router.get("/", auth, async (req, res) => {
  try {
    // get user info by id
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// GET appartameni dell'utente loggato
router.get("/appartamenti", auth, async (req, res) => {
  Appartamento.find({ user: req.user.id }, (err, appartamenti) => {
    if (err) {
      res.status(400).send(err);
    }
    res.json(appartamenti);
  });
});

// GET libri dell'utente loggato
router.get("/libri", auth, async (req, res) => {
  Libro.find({ user: req.user.id }, (err, libri) => {
    if (err) {
      res.status(400).send(err);
    }
    res.json(libri);
  });
});

// GET corsi dell'utente loggato
router.get("/corsi", auth, async (req, res) => {
  Corso.find({ user: req.user.id }, (err, corso) => {
    if (err) {
      res.status(400).send(err);
    }
    res.json(corso);
  });
});

// GET chat dell'utente loggato
router.get("/chat", auth, async (req, res) => {
  let response = [];
  Chat.find({partecipanti: {$in: [req.user.id]}}).sort({ ultimo_messaggio: "desc" }).exec(async (err, chats) => {
    if (err) {
      res.status(400).send(err);
    }
    for(let i = 0; i < chats.length; i++) {
      const chat = chats[i];
      try {
        const user = await User.findById(chat.partecipanti.filter(user => user !== req.user.id)).select("-password");
        response.push({
          chat: chat,
          user: user
        });
      } catch (error) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    }
    res.json(response);
  });
});

//POST api/user/register
//desc Registrazione nuovi utenti
router.post(
  "/register",
  [
    // Check validità
    check("name", "name richiesto").not().isEmpty(),
    check("email", "Per favore inserisci una mail valida").isEmail(),
    check(
      "password",
      "Per favore inserisci una password di 6 caratteri e confermala"
    )
      .isLength({ min: 6 })
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.confirmpassword) {
          // trow error if passwords do not match
          throw new Error("Le password non corrispondono");
        } else {
          return value;
        }
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Prendi nome,mail e password da req
    const { name, email, password } = req.body;

    try {
      // Controlla se user esiste già (tramite mail)
      let user = await User.findOne({ email });
      // Se user esiste già
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Utente già registrato",
            },
          ],
        });
      }

      // Se non esiste
      // Fetch immagine profilo tramite gravatar
      const avatar = gravatar.url(email, {
        s: "200", // Size
        r: "pg", // Rate,
        d: "mm",
      });

      //Crea User
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10); //generate salt contains 10
      // save password
      user.password = await bcrypt.hash(password, salt); // use userp

      //Salva user in database
      await user.save();
      // payload per generare token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000, // for development for production it will 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

//POST api/user/login
//desc login user
router.post(
  "/login",
  [
    // Check validità mail e password
    check("email", "Per favore inserisci una mail valida").isEmail(),
    check("password", "Inserisci password valida").exists(),
  ],
  async (req, res) => {
    // If error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Se va tutto bene
    // Prendi mail e pass da req body
    const { email, password } = req.body;
    try {
      // Cerca User tramite mail
      let user = await User.findOne({
        email,
      });
      // Se user non presente nel database
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Utente non registrato, credenziali non valide",
            },
          ],
        });
      }
      // Trovato user con mail ora facciamo compare password
      const isMatch = await bcrypt.compare(password, user.password);
      // password non corrispondono
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: "Password errata",
            },
          ],
        });
      }

      // payload per jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.cookie("access-token", token, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
          });
          res.json("logged in");
        }
      );
    } catch (error) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
