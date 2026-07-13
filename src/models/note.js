import { model, Schema } from 'mongoose';

export const notesSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '', trim: true },
    tag: {
      type: String,
      default: 'Todo',
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
    },
  },
  { timestamps: true },
);

export const Notes = model('Notes', notesSchema, 'notes');
