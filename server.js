const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/index.js");
const errorHandler = require("./middleware/errorhandler.js");

dotenv.config();

const app = express();
app.use(express.json());
routes(app);

app.use(errorHandler);

module.exports = app;
