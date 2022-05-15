const express = require('express');
const path = require('path');

const static = require("./routes/static");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'src')));
app.use(static);


app.listen(port, () => {
  console.log(`Server listening on port ${port}\n\nhttp://localhost:${port}`);
});
