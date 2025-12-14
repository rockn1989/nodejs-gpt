"use strict";

const express = require("express");
const app = express();

const notesRoutes = require("./routes/notesRoutes.js");
const logger = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");

app.use(express.json());
app.use(logger);
app.use("/api/notes", notesRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("Server started"));
