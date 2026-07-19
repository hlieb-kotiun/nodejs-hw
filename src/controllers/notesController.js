import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// GET /notes
export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 5, tag, search } = req.query;

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find({ userId: req.user._id });

  if (tag) {
    notesQuery.where('tag').equals(tag);
  }

  if (search) {
    notesQuery.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({ page, perPage, totalNotes, totalPages, notes });
};

// GET /notes/:noteId
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const notes = await Note.findOne({ _id: noteId, userId: req.user._id });
  if (!notes) {
    throw createHttpError(404, 'Note not found!');
  }
  res.status(200).json(notes);
};

export const createNote = async (req, res) => {
  const body = req.body;
  const note = await Note.create({ ...body, userId: req.user._id });
  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    {
      returnDocument: 'after',
    },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found!');
  }

  res.status(200).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found!');
  }
  res.status(200).json(note);
};
