const express = require("express");
const Appartamento = require("../models/Appartamento");
const router = express.Router();

// Get appartamenti
router.get("/appartamenti", (req, res) => {
	Appartamento.find({}, (err, appartamenti) => {
		if (err) {
			res.send(err);
		}
		res.json(appartamenti);
	});
});

// Get appartamento by id
router.get("/appartamenti/:id", (req, res) => {
	Appartamento.findById(req.params.id, (err, appartamento) => {
		if (err) {
			res.send(err);
		}
		res.json(appartamento);
	})
});

// Create appartamento
router.post("/appartamenti", (req, res) => {
	Appartamento.create(req.body, (err, appartamento) => {
		if (err) {
			res.send(err);
		}
		res.json(appartamento);
	});
});

// Update appartamento
router.patch("/appartamenti/:id", (req, res) => {
	Appartamento.findByIdAndUpdate(req.params.id, req.body, (err, appartamento) => {
		if (err) {
			res.send(err);
		}
		res.json(appartamento);
	});
});

// Delete appartamento
router.delete("/appartamenti/:id", (req, res) => {
	Appartamento.findByIdAndRemove(req.params.id, (err, appartamento) => {
		if (err) {
			res.send(err);
		}
		res.json(appartamento);
	});
});

module.exports = router;