const express = require('express');
const path = require('path');
const mongoose = require("mongoose")

const static = require("./routes/static");
const api = require("./routes/api");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'src')));
app.use(static);

mongoose
	.connect("mongodb://localhost:27017/studentshub", { useNewUrlParser: true })
	.then(() => {
		app.use(express.json({limit: '50mb'}));
		app.use(express.urlencoded({limit: '50mb', extended: true}));
		app.use(function (req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
			res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			res.setHeader('Access-Control-Allow-Credentials', true);
			next();
		});
		app.use("/api", api);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}\n\nhttp://localhost:${port}`);
});
