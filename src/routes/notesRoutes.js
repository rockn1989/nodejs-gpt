"use strict";

const { Router } = require(`express`);
const notesController = require("../controllers/notesController.js");

const notesRoutes = new Router();

notesRoutes.get("/", notesController.getAll);

notesRoutes.get("/:id", notesController.getOne);

notesRoutes.post("/", notesController.create);

notesRoutes.put("/:id", notesController.update);

notesRoutes.delete("/:id", notesController.remove);

module.exports = notesRoutes;
