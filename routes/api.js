const express = require("express");

const appartamenti = require("./api/appartamenti");

const router = express.Router();

router.use("/appartamenti", appartamenti);

module.exports = router;