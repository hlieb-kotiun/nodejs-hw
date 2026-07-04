import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// GET /notes
export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

// GET /notes/:noteId
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOne({ _id: noteId });
  if (!note) {
    throw createHttpError(404, 'Note not found!');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const body = req.body;
  const note = await Note.create(body);
  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });

  if (!note) {
    throw createHttpError(404).json('Note not found!');
  }

  res.status(200).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndDelete({ _id: noteId });

  if (!note) {
    throw createHttpError(404, 'Note not found!');
  }
  res.status(200).json(note);
};
