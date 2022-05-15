const express = require("express");
const path = require("path");

const router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

router.get('/appartamenti', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/appartamenti.html'));
});

router.get('/appartamento', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/appartamento.html'));
});

router.get('/corsi', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/corsi.html'));
});

router.get('/libri', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/libri.html'));
});

router.get('/signin', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/signin.html'));
});

module.exports = router;