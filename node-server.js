const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const route = require("./route/index.js");
const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

route(app);

app.listen(port, async () => {
  console.log("Server started on " + port);
});
