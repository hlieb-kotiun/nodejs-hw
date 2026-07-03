import { model, Schema } from 'mongoose';

export const notesSchema = new Schema(
  {
    title: { required: true, trim: true },
    content: { default: '', trim: '' },
    tag: {
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
