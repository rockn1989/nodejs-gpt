"use strict";

const NoteModel = require("../models/note.models.js");
const saveNotes = require("../utils/saveNotes.utils.js");
const loadNotes = require("../utils/loadNotes.utils.js");
const NotFoundError = require("../errors/NotFoundError.js");

const getAllNotes = async () => await loadNotes();

const getNoteById = async (id) => {
  const notes = await loadNotes();
  const note = notes.find((n) => n.id === id);

  if (!note) throw new NotFoundError("Note not found");
  return note;
};

const createNote = async (data) => {
  const notes = await loadNotes();

  const { title, content } = data;

  const newNote = NoteModel.createNote({
    title,
    content,
  });

  notes.push(newNote);
  await saveNotes(notes);

  return newNote;
};

const updateNote = async (id, data) => {
  const notes = await loadNotes();
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) throw new NotFoundError("Note not found");

  const { title, content } = data;
  notes[index] = NoteModel.updateNote(notes[index], { title, content });
  await saveNotes(notes);

  return notes[index];
};

const deleteNote = async (id) => {
  const notes = await loadNotes();
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) throw new NotFoundError("Note not found");

  notes.splice(index, 1);
  await saveNotes(notes);
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
