import createHttpError from 'http-errors';
import { Notes } from '../models/note';

// GET /notes
export const getAllNotes = async (req, res) => {
  const notes = Notes.find();
  res.status(200).json(notes);
};

// GET /notes/:noteId
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const notes = Notes.findById(noteId);
  if (!notes) {
    return createHttpError(404, 'Note not found!');
  }
  res.status(200).json(notes);
};
