const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const static = require("./routes/static");
const db = require("./db")
const api = require("./routes/api");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

require("dotenv").config({
  path: ".env",
});

const port = process.env.NODE_PORT || 8080;

let nginx_port = process.env.NGINX_PORT;

if (!process.env.DOCKER) {
  console.log('Not running in docker, you should use: "docker-compose up"\n');
  nginx_port = port;
}

app.use(express.static(path.join(__dirname, "assets")));
app.use(static);
module.exports = app;

db.connect()
  .then(() => {
    app.use(function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:" + nginx_port);
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
  })

app.listen(port, () => {
  console.log(`Node Server listening on port ${port}\n\nhttp://localhost:${nginx_port}`);
});  
