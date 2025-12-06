"use strict";

let notes = require("../data/notes.js");
const saveData = require("../middleware/saveData.js");
const { Router } = require(`express`);
const notesRoutes = new Router();

notesRoutes.get("/notes", (req, res) => {
  res.json({
    data: notes,
  });
});

notesRoutes.get("/notes/:id", (req, res) => {
  const { id } = req.params;

  const note = notes.find((el) => el.id === Number(id));

  if (!note) {
    res.status(404).send(`Нет записи с id: ${id}`);
  }

  res.json({
    ...note,
  });
});

notesRoutes.post("/notes", saveData, (req, res) => {
  const { id, message } = req.body;
  const note = notes.find((el) => el.id === Number(id));

  if (note) {
    res.status(400).send("Запись с таким id уже существует");
  } else {
    notes.push({
      id: parseInt(id, 10),
      message,
    });

    res.status(201).send("Запись была успешно создана под id: " + id);
  }
});

notesRoutes.put("/notes/:id", (req, res) => {
  const { id, message } = req.body;
  const note = notes.find((el) => el.id === Number(id));
  const noteIndex = notes.findIndex((el) => el.id === Number(id));

  if (!note) {
    res.status(404).send(`Нет записи с id: ${id}`);
  }

  note.message = message;

  notes.splice(noteIndex, 1, note);
  res.status(201).send("Запись была успешно обновлена под id: " + id);
});

notesRoutes.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((el) => el.id === Number(id));

  if (!note) {
    res.status(404).send(`Нет записи с id: ${id}`);
  }

  notes = notes.filter((el) => el.id !== Number(id));

  res.status(203).send("Запись была успешно удалена под id: " + id);
});

module.exports = notesRoutes;
