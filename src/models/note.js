import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const notesSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '', trim: true },
    tag: {
      type: String,
      default: 'Todo',
      enum: [...TAGS],
    },
  },
  { timestamps: true },
);

notesSchema.index({ tag: 1 });

export const Note = model('Notes', notesSchema);
