import createHttpError from 'http-errors';
import { Notes } from '../models/note.js';

// GET /notes
// GET /notes/:noteId
// POST /notes
// PATCH /notes/:noteId
// DELETE /notes/:noteId

// GET /notes
export const getAllNotes = async (req, res) => {
  const notes = await Notes.find();
  res.status(200).json(notes);
};

// GET /notes/:noteId
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const notes = await Notes.findOne({ _id: noteId });
  if (!notes) {
    throw createHttpError(404, 'Note not found!');
  }
  res.status(200).json(notes);
};

export const createNote = async (req, res) => {
  const body = req.body;
  const note = await Notes.create(body);
  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Notes.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });

  if (!note) {
    throw createHttpError(404).json(note);
  }

  res.status(200).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Notes.findOneAndDelete({ _id: noteId });

  if (!note) {
    throw createHttpError(404, 'Note not found!');
  }
  res.status(200).json(note);
};
