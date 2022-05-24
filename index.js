const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const static = require("./routes/static");
const api = require("./routes/api");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

require("dotenv").config({
  path: ".env",
});

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "assets")));
app.use(static);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
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
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}\n\nhttp://localhost:${port}`);
});
