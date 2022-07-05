const express = require("express");
const path = require("path");

const auth = require("../middleware/authStatic");

const router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/appartamenti", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/appartamenti.html"));
});

router.get("/FormAppartamento", auth, function (req, res) {
  if (!req.user) res.redirect("/signin");
  else res.sendFile(path.join(__dirname, "../views/FormAppartamento.html"));
});

router.get("/appartamento", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/appartamento.html"));
});

router.get("/corsi", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/corsi.html"));
});

router.get("/SchedaTutor", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/SchedaTutor.html"));
});

router.get("/calendar", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/calendar.html"));
});

router.get("/drive", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/drive.html"));
});

router.get("/FormTutor", auth, function (req, res) {
  if (!req.user) res.redirect("/signin");
  else res.sendFile(path.join(__dirname, "../views/FormTutor.html"));
});

router.get("/libri", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/libri.html"));
});

router.get("/libro", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/libro.html"));
});

router.get("/FormLibro", auth, function (req, res) {
  if (!req.user) res.redirect("/signin");
  else res.sendFile(path.join(__dirname, "../views/FormLibro.html"));
});

router.get("/user", auth, function (req, res) {
  if (!req.user) res.redirect("/signin");
  else res.sendFile(path.join(__dirname, "../views/UserProfile.html"));
});

router.get("/signin", auth, function (req, res) {
  if (req.user) res.redirect("/");
  else res.sendFile(path.join(__dirname, "../views/signin.html"));
});

router.get("/docs", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/apidoc.html"));
});

module.exports = router;
