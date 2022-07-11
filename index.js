const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const static = require("./routes/static");
const favicon = require("serve-favicon")
const api = require("./routes/api");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, "assets/img", "favicon.ico")))

const dotenv = require("dotenv");

if (process.env.NODE_ENV != "test") {
  //Connessione Moongose
  require("./db").connect();

  dotenv.config({
    path: ".env",
  });
} else {
  dotenv.config({
    path: ".env.example",
  });
}

const port = process.env.NODE_PORT || 8080;

if (!process.env.DOCKER) {
  console.log('Not running in docker, you should use: "docker-compose up"\n');
}

app.use(express.static(path.join(__dirname, "assets")));
app.use(static);

module.exports = app;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/api", api);

app.listen(port, () => {
  console.log(
    `Node Server listening on port ${port}\n\n` +
      (process.env.DOCKER ? "https://localhost" : `http://localhost:${port}`)
  );
});
