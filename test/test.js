process.env.NODE_ENV = "test";
const server = require("../index");

const db = require("../db");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

let token;
let token2;
let id1;
let id2;
let tokenerrato = 0;

describe("TEST API", () => {
  //Connessione a Mock Database
  before((done) => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  //==================Test API user.js==================
  describe("User APIs", () => {
    const signup = "/api/user/register";
    const signin = "/api/user/login";
    const userinfo = "/api/user/";
    const userappartamenti = "/api/user/appartamenti";
    const userlibri = "/api/user/libri";
    const usercorsi = "/api/user/corsi";
    const userchat = "/api/user/chat"

    //Test Registrazione
    describe("Test Registrazione", () => {
      it("/ Deve restituire 200 e registrare l'utente TestUser e rilasciare il token", (done) => {
        const user = {
          name: "test",
          email: "test@test.com",
          password: "1234567",
          confirmpassword: "1234567",
        };
        chai
          .request(server)
          .post(signup)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            token = res.body.token;
            done();
          });
      });

      it("/ Deve restituire 200 e registrare un secondo utente per test successivi", (done) => {
        const user = {
          name: "test2",
          email: "test2@test.com",
          password: "1234567",
          confirmpassword: "1234567",
        };
        chai
          .request(server)
          .post(signup)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            token2 = res.body.token;
            done();
          });
      });

      //Test Registrazione errato: stesso utente
      it("/ Deve restituire 400 per tentativo di registrazione di utente già registrato", (done) => {
        const user = {
          name: "test",
          email: "test@test.com",
          password: "1234567",
          confirmpassword: "1234567",
        };
        chai
          .request(server)
          .post(signup)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      //Test Registrazione errato: confirmpassword
      it("/ Deve restituire 400 per confirmpassword non conforme", (done) => {
        const user = {
          name: "test",
          email: "test@test.com",
          password: "1234567",
          confirmpassword: "1234568",
        };
        chai
          .request(server)
          .post(signup)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    //Test Login
    describe("Test Login", () => {
      it("/ Deve restituire 200 e effettuare il login dell'utente TestUser", (done) => {
        const user = {
          email: "test@test.com",
          password: "1234567",
        };
        chai
          .request(server)
          .post(signin)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      //Test login errato: utente NON registrato
      it("/ Deve restituire 400 perchè l'utente NON è registrato", (done) => {
        const user = {
          email: "test5@test.com",
          password: "1234567",
        };
        chai
          .request(server)
          .post(signin)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      //Test login errato: form login vuota
      it("/ Deve restituire 400 perchè la form di login è vuota", (done) => {
        const user = {
          email: "",
          password: "",
        };
        chai
          .request(server)
          .post(signin)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });

      //Test login errato: password errata
      it("/ Deve restituire 400 perchè la password è errata", (done) => {
        const user = {
          email: "test@test.com",
          password: "7654321",
        };
        chai
          .request(server)
          .post(signin)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    //Test UserInfo
    describe("Test UserInfo", () => {
      it("/ Deve restituire 200 e le user info presenti nel database dopo check Token", (done) => {
        chai
          .request(server)
          .get(userinfo)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            id1 = res.body._id;
            done();
          });
      });

      it("/ Deve restituire 200 e le user info presenti nel database dopo check Token per il 2 utente", (done) => {
        chai
          .request(server)
          .get(userinfo)
          .set("Cookie", `access-token=${token2}`)
          .end((err, res) => {
            res.should.have.status(200);
            id2 = res.body._id;
            done();
          });
      });

      //Test UserInfo errato: Token non valido
      it("/ Deve restituire 401 dopo il check del Token non valido", (done) => {
        chai
          .request(server)
          .get(userinfo)
          .set("Cookie", `access-token=${tokenerrato}`)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });

      //Test UserInfo errato: Token non presente
      it("/ Deve restituire 401 dopo il check della presenza del token", (done) => {
        chai
          .request(server)
          .get(userinfo)
          .set("Cookie", "")
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });

    //Test Appartamenti di User
    describe("Test Appartamenti User", () => {
      it("/ Deve restituire 200 e le entry Appartamenti nel db di User", (done) => {
        chai
          .request(server)
          .get(userappartamenti)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    //Test Chat di User
    describe("Test Chat User", () => {
      it("/ Deve restituire 200 e le entry chat nel db di User", (done) => {
        chai
          .request(server)
          .get(userchat)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    //Test Libri di User
    describe("Test Libri User", () => {
      it("/ Deve restituire 200 e le entry Libri nel db di User", (done) => {
        chai
          .request(server)
          .get(userlibri)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    //Test Corsi di User
    describe("Test Corsi User", () => {
      it("/ Deve restituire 200 e le entry Corsi nel db di User", (done) => {
        chai
          .request(server)
          .get(usercorsi)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

  //==================Test static.js==================
  describe("Static routes", () => {
    const FormAppartamento = "/FormAppartamento";
    const FormLibri = "/FormLibro";
    const FormTutor = "/FormTutor";
    const StaticSignin = "/signin";
    const StaticUser = "/user";
    const calendar = "/calendar";
    const drive = "/drive";
    const chat = "/chat";

    //FormAppartamento
    describe("Test Form Appartamento", () => {
      it("/ Deve restituire 200 se è presente il token di accesso nei cookies", (done) => {
        chai
          .request(server)
          .get(FormAppartamento)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      //FormAppartamento token non presente
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token non presente", (done) => {
        chai
          .request(server)
          .get(FormAppartamento)
          .set("Cookie", "")
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });

      //FormAppartamento token errato
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token errato", (done) => {
        chai
          .request(server)
          .get(FormAppartamento)
          .set("Cookie", `access-token=${tokenerrato}`)
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });
    });

    //FormLibro
    describe("Test Form Libro", () => {
      it("/ Deve restituire 200 se è presente il token di accesso nei cookies", (done) => {
        chai
          .request(server)
          .get(FormLibri)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      //FormLibro token non presente
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token non presente", (done) => {
        chai
          .request(server)
          .get(FormLibri)
          .set("Cookie", "")
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });

      //FormLibro token errato
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token errato", (done) => {
        chai
          .request(server)
          .get(FormLibri)
          .set("Cookie", `access-token=${tokenerrato}`)
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });
    });

    //FormTutor
    describe("Test Form Tutor", () => {
      it("/ Deve restituire 200 se è presente il token di accesso nei cookies", (done) => {
        chai
          .request(server)
          .get(FormTutor)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      //FormTutor token non presente
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token non presente", (done) => {
        chai
          .request(server)
          .get(FormTutor)
          .set("Cookie", "")
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });

      //FormTutor token errato
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token errato", (done) => {
        chai
          .request(server)
          .get(FormTutor)
          .set("Cookie", `access-token=${tokenerrato}`)
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });
    });

    //Calendar
    describe("Test Calendar", () => {
      it("/ Deve restituire 200 se è presente il token di accesso nei cookies", (done) => {
        chai
          .request(server)
          .get(calendar)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      //Calendar token non presente
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token non presente", (done) => {
        chai
          .request(server)
          .get(calendar)
          .set("Cookie", "")
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });

      //Calendar token errato
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token errato", (done) => {
        chai
          .request(server)
          .get(calendar)
          .set("Cookie", `access-token=${tokenerrato}`)
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });
    });

    //Drive
    describe("Test Drive", () => {
      it("/ Deve restituire 200 se è presente il token di accesso nei cookies", (done) => {
        chai
          .request(server)
          .get(drive)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      //Drive token non presente
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token non presente", (done) => {
        chai
          .request(server)
          .get(drive)
          .set("Cookie", "")
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });

      //Drive token errato
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token errato", (done) => {
        chai
          .request(server)
          .get(drive)
          .set("Cookie", `access-token=${tokenerrato}`)
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });
    });

    //Chat
    describe("Test Chat", () => {
      it("/ Deve restituire 200 se è presente il token di accesso nei cookies", (done) => {
        chai
          .request(server)
          .get(chat)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      //Chat token non presente
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token non presente", (done) => {
        chai
          .request(server)
          .get(chat)
          .set("Cookie", "")
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });

      //Chat token errato
      it("/ Deve restituire 302 e reindirizzare alla pagina di login per token errato", (done) => {
        chai
          .request(server)
          .get(chat)
          .set("Cookie", `access-token=${tokenerrato}`)
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });
    });

    //Signin token non presente
    describe("Test Static Signin", () => {
      it("/ Deve restituire 200 se non presente il cookie per accedere a /user", (done) => {
        chai
          .request(server)
          .get(StaticSignin)
          .set("Cookie", "")
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      //Signin con token
      it("/ Deve restituire 302 reindirizzare a /user se è presente il token di accesso nei cookies", (done) => {
        chai
          .request(server)
          .get(StaticSignin)
          .set("Cookie", `access-token=${token}`)
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });

      //Signin token errato
      it("/ Deve restituire 200 e restare su /signin per token errato", (done) => {
        chai
          .request(server)
          .get(StaticSignin)
          .set("Cookie", `access-token=${tokenerrato}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    //User con token
    describe("Test Static User", () => {
      it("/ Deve restituire 200 se presente il cookie di autenticazione", (done) => {
        chai
          .request(server)
          .get(StaticUser)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      //User senza token
      it("/ Deve restituire 302 reindirizzare a /signin per token assente", (done) => {
        chai
          .request(server)
          .get(StaticUser)
          .set("Cookie", "")
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });

      //User token errato
      it("/ Deve restituire 302 e reindirizzare a /signin per token errato", (done) => {
        chai
          .request(server)
          .get(StaticUser)
          .set("Cookie", `access-token=${tokenerrato}`)
          .redirects(0)
          .end((err, res) => {
            res.should.have.status(302);
            done();
          });
      });
    });
  });

  //==================Test API corsi.js==================
  describe("Corsi APIs", () => {
    const getcorsi = "/api/corsi/";
    const creacorso = "/api/corsi/FormTutor";
    const SchedaTutor = "/api/corsi/SchedaTutor";
    let idCorso;

    //GET Corsi
    describe("Test GET corsi", () => {
      it("/ Deve restituire 200 e l'array di corsi", (done) => {
        chai
          .request(server)
          .get(getcorsi)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });

    //POST Corsi
    describe("Test POST nuovo corso", () => {
      it("/ Deve restituire 200 e creare un nuovo corso nel db", (done) => {
        const corso = {
          Nome: "Test",
          Cognome: "Test",
          Regione: "Lazio",
          Titolo_di_studio: "Studente Universitario",
          Foto: "",
          Livello: "Principiante",
          Materia: "Matematica",
          Lingua: "Italiano",
          Lingua_Secondaria: "Inglese",
          Modalita: [true, true],
          Prezzo: 12,
          Titolo: "Test",
          Descrizione: "Test",
        };
        chai
          .request(server)
          .post(creacorso)
          .set("Cookie", `access-token=${token}`)
          .send(corso)
          .end((err, res) => {
            res.should.have.status(200);
            idCorso = res.body._id;
            done();
          });
      });
    });

    //GET Corso by ID
    describe("Test GET corso by ID", () => {
      it("/ Deve restituire 200 e la entry corso con id cercato", (done) => {
        chai
          .request(server)
          .get("/api/corsi/SchedaTutor/" + idCorso)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it("/ Deve restituire 400 per id non presente nel db", (done) => {
        chai
          .request(server)
          .get("/api/corsi/SchedaTutor/" + 0)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    //GET Corso by filters
    describe("Test GET corso by filters", () => {
      it("/ Deve restituire 200 e i corsi trovati con i filtri di ricerca", (done) => {
        const filtri = {
          Materia: "Matematica",
          Livello: "Principiante",
          Regione: "Lazio",
        };
        chai
          .request(server)
          .get(SchedaTutor)
          .send(filtri)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    //DELETE Corso
    describe("Test DELETE corso", () => {
      it("/ Deve restituire 200 ed eliminare il corso con id passato", (done) => {
        chai
          .request(server)
          .delete("/api/corsi/" + idCorso)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it("/ Deve restituire 500 per eliminazione non autorizzata", (done) => {
        chai
          .request(server)
          .delete("/api/corsi/" + idCorso)
          .set("Cookie", `access-token=${token2}`)
          .end((err, res) => {
            res.should.have.status(500);
            done();
          });
      });
    });
  });

  //==================Test API appartamenti.js==================
  describe("Appartamenti APIs", () => {
    const appartamenti = "/api/appartamenti/";
    const getcoordinates = "/api/appartamenti/map/coordinate";
    let idAppartamento;

    //GET Appartamenti
    describe("Test GET Appartamenti", () => {
      it("/ Deve restituire 200 e l'array di appartamenti", (done) => {
        chai
          .request(server)
          .get(appartamenti)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });

    //POST Appartamenti
    describe("Test POST Appartamenti", () => {
      it("/ Deve restituire 200 e creare appartamento nel db", (done) => {
        const appartamento = {
          titolo: "appartamento",
          descrizione: "test",
          tipologia: "Camera Singola",
          prezzo: 200,
          caparra: 100,
          utenze_medie: 2,
          posti_letto: 2,
          citta: "Roma",
          lat: 30,
          lng: 20,
          classe_energetica: "A",
          contratto: 2,
          restrizioni: "Solo Ragazze",
          metri_quadri: 100,
          indirizzo: "via test",
          riscaldamento: "Autonomo",
          internet: true,
          fumatori_ammessi: false,
          ascensore: true,
          animali_domestici: true,
          lavatrice: true,
          asciugatrice: true,
          televisione: true,
          aria_condizionata: false,
          accesso_disabili: false,
          immagini: "",
        };
        chai
          .request(server)
          .post(appartamenti)
          .set("Cookie", `access-token=${token}`)
          .send(appartamento)
          .end((err, res) => {
            res.should.have.status(200);
            idAppartamento = res.body._id;
            done();
          });
      });

      it("/ Deve restituire 400 per query errata", (done) => {
        const appartamento = {
          titolo: "appartamento",
          descrizione: "test",
          tipologia: "Camera Singola",
          prezzo: 200,
          caparra: 100,
          utenze_medie: 2,
          posti_letto: 2,
          citta: "Roma",
          lat: 30,
          lng: 20,
          classe_energetica: "A",
          contratto: "due",
          restrizioni: "Solo Ragazze",
          metri_quadri: 100,
          indirizzo: "via test",
          riscaldamento: "Autonomo",
          internet: true,
          fumatori_ammessi: false,
          ascensore: true,
          animali_domestici: true,
          lavatrice: true,
          asciugatrice: true,
          televisione: true,
          aria_condizionata: false,
          accesso_disabili: false,
          immagini: "",
        };
        chai
          .request(server)
          .post(appartamenti)
          .set("Cookie", `access-token=${token}`)
          .send(appartamento)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    //GET Maps coordinates
    describe("Test GET Map coordinates", () => {
      it("/ Deve restituire 200 e le coordinate di maps", (done) => {
        chai
          .request(server)
          .get(getcoordinates)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    //GET Appartamenti by Filtri
    describe("Test GET Appartamenti by Filtri", () => {
      it("/ Deve restituire 200 e gli appartamenti trovati con i filtri di ricerca", (done) => {
        const filtri = {
          tipologia: "Camera Singola",
          prezzo: 200,
          posti_letto: 2,
          citta: "Roma",
          classe_energetica: "A",
          contratto: "Altro",
          restrizioni: "Solo Ragazze",
          riscaldamento: "Autonomo",
          internet: true,
          fumatori_ammessi: false,
          ascensore: true,
          animali_domestici: true,
          lavatrice: true,
          asciugatrice: true,
          televisione: true,
          aria_condizionata: false,
          accesso_disabili: false,
        };
        chai
          .request(server)
          .get(appartamenti)
          .send(filtri)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it("/ Deve restituire 200 e gli appartamenti trovati con i filtri di ricerca vuoti", (done) => {
        const filtri = {};
        chai
          .request(server)
          .get(appartamenti)
          .send(filtri)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

    });

    //GET Appartamento by ID
    describe("Test GET appartamento by ID", () => {
      it("/ Deve restituire 200 e la entry appartamento con id cercato", (done) => {
        chai
          .request(server)
          .get("/api/appartamenti/" + idAppartamento)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it("/ Deve restituire 400 per id non presente nel db", (done) => {
        chai
          .request(server)
          .get("/api/appartamenti/" + 0)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    //DELETE Appartamento
    describe("Test DELETE Appartamento", () => {
      it("/ Deve restituire 200 ed eliminare appartamento con id passato", (done) => {
        chai
          .request(server)
          .delete("/api/appartamenti/" + idAppartamento)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it("/ Deve restituire 500 per eliminazione non autorizzata", (done) => {
        chai
          .request(server)
          .delete("/api/appartamenti/" + idAppartamento)
          .set("Cookie", `access-token=${token2}`)
          .end((err, res) => {
            res.should.have.status(500);
            done();
          });
      });
    });
  });

  //==================Test API libri.js==================
  describe("Libri APIs", () => {
    const getlibri = "/api/libri/";
    const crealibro = "/api/libri/crea-libro";
    const librofiltro = "/api/libri/materie-prezzo";
    let idLibro;

    //GET Libri
    describe("Test GET libri", () => {
      it("/ Deve restituire 200 e l'array di libri", (done) => {
        chai
          .request(server)
          .get(getlibri)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });

    //POST Libri
    describe("Test POST nuovo libro", () => {
      it("/ Deve restituire 200 e creare un nuovo libro nel db", (done) => {
        const libro = {
          immagine: "test",
          materia: "matematica",
          titolo: "test",
          descrizione: "test",
          prezzo: 10,
        };
        chai
          .request(server)
          .post(crealibro)
          .set("Cookie", `access-token=${token}`)
          .send(libro)
          .end((err, res) => {
            res.should.have.status(200);
            idLibro = res.body._id;
            done();
          });
      });
    });

    //GET Libro by ID
    describe("Test GET libro by ID", () => {
      it("/ Deve restituire 200 e la entry libro con id cercato", (done) => {
        chai
          .request(server)
          .get("/api/libri/" + idLibro)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it("/ Deve restituire 400 per id non presente nel db", (done) => {
        chai
          .request(server)
          .get("/api/libri/" + 0)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    //GET libro by filters
    describe("Test GET libro by filters", () => {
      it("/ Deve restituire 200 e i libri trovati con i filtri di ricerca", (done) => {
        const filtri = {
          Prezzo: 10,
          Materia: "Matematica",
        };
        chai
          .request(server)
          .get(librofiltro)
          .send(filtri)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it("/ Deve restituire 200 e i libri trovati con la ricerca per nome", (done) => {
        const titolo = "test";
        chai
          .request(server)
          .get("/api/libri/search/" + titolo)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    //DELETE Libro
    describe("Test DELETE libro", () => {
      it("/ Deve restituire 200 ed eliminare il libro con id passato", (done) => {
        chai
          .request(server)
          .delete("/api/libri/" + idLibro)
          .set("Cookie", `access-token=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });

      it("/ Deve restituire 500 per eliminazione non autorizzata", (done) => {
        chai
          .request(server)
          .delete("/api/libri/" + idLibro)
          .set("Cookie", `access-token=${token2}`)
          .end((err, res) => {
            res.should.have.status(500);
            done();
          });
      });
    });
  });

  //==================Test API chat.js==================
  describe("Chat APIs", () => {
    const chatroute = "/api/chat/";
    let chat;

    //POST chat
    describe("Test POST Chat tra 2 utenti", () => {
      it("/ deve restituire 400 poiche non è possibile creare una chat con se stessi", (done) => {
       const utente = {
         user: id1
        }
        chai
            .request(server)
            .post(chatroute)
            .set("Cookie", `access-token=${token}`)
            .send(utente)
            .end((err, res) => {
              res.should.have.status(400);
              done();
            })
      });

      it("/ deve restituire 200 e la nuova chat creata tra i 2 utenti", (done) => {
        const utente2 = {
          user: id2
        }
        chai   
            .request(server)
            .post(chatroute)
            .set("Cookie", `access-token=${token}`)
            .send(utente2)
            .end((err, res) => {
              res.should.have.status(200)
              chat = res.body
              done()
            })
      })
    })

    //GET Chat
    describe("Test GET chat tra 2 utente", () => {
      it("/ deve restutire 400 poiche non puoi chattare con te stesso", (done) => {
        chai 
            .request(server)
            .get(chatroute)
            .set("Cookie", `access-token=${token}`)
            .query({user: id1})
            .end((err, res) => {
              res.should.have.status(400)
              done()
            })
      })

      it("/ deve restutire 200 e la chat tra i 2 utenti", (done) => {
        chai 
            .request(server)
            .get(chatroute)
            .set("Cookie", `access-token=${token}`)
            .query({user: id2})
            .end((err, res) => {
              res.should.have.status(200)
              done()
            })
      })
    })

  })
});
