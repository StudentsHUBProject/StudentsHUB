const express = require("express");

const router = express.Router();

router.use("/appartamenti", require("./api/appartamenti"));
router.use("/corsi", require("./api/corsi"));
router.use("/libri", require("./api/libri"));

router.use("/user", require("./api/user"));

module.exports = router;
