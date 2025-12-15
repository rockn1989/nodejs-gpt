"use strict";

const { HttpCode } = require("../constants.js");
const notesService = require("../service/notesService.js");

const getAll = async (req, res, next) => {
  try {
    const notes = await notesService.getAllNotes();
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const note = await notesService.getNoteById(req.params.id);
    res.json(note);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const newNote = await notesService.createNote(req.body);
    res.status(HttpCode.CREATED).json(newNote);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const updatedNote = await notesService.updateNote(req.params.id, req.body);
    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await notesService.deleteNote(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
