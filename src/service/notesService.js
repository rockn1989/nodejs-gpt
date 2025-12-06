"use strict";

const fs = require("fs");
const path = require("path");

const saveData = require("../data/saveData.js");

const filePath = path.join(__dirname, "../data/data.json");

const loadNotes = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const getAllNotes = async () => loadNotes();

const getNoteById = async (id) => {
  const notes = await loadNotes();
  const note = notes.find((n) => n.id === Number(id));

  if (!note) throw new Error("Note not found");
  return note;
};

const createNote = async (data) => {
  const notes = await loadNotes();

  const index = notes.findIndex((n) => n.id === Number(data.id));
  if (index > 0) throw new Error("Exists note");

  const newNote = {
    id: Number(data.id),
    message: data.message || "",
  };

  notes.push(newNote);
  await saveData(notes);

  return newNote;
};

const updateNote = async (id, data) => {
  const notes = await loadNotes();
  const index = notes.findIndex((n) => n.id === Number(id));
  if (index === -1) throw new Error("Note not found");

  notes[index].message = data.message || notes[index].message;
  await saveData(notes);

  return notes[index];
};

const deleteNote = async (id) => {
  const notes = await loadNotes();
  const index = notes.findIndex((n) => n.id === Number(id));
  if (index === -1) throw new Error("Note not found");

  notes.splice(index, 1);
  await saveData(notes);
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
