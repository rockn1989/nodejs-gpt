"use strict";

const { Router } = require(`express`);
const notesController = require("../controllers/notesController.js");
const noteValidate = require("../middleware/noteValidate.js");
const NoteCreateSchema = require("../schema/note.create.schema.js");
const NoteUpdateSchema = require("../schema/note.update.schema.js");

const notesRoutes = new Router();

notesRoutes.get("/", notesController.getAll);

notesRoutes.get("/:id", notesController.getOne);

notesRoutes.post("/", noteValidate(NoteCreateSchema), notesController.create);

notesRoutes.put("/:id", noteValidate(NoteUpdateSchema), notesController.update);

notesRoutes.delete("/:id", notesController.remove);

module.exports = notesRoutes;
