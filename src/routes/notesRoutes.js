import { Router } from 'express';

// GET /notes
// GET /notes/:noteId
// POST /notes
// PATCH /notes/:noteId
// DELETE /notes/:noteId

export const router = Router();

router.get('/notes');
router.get('/notes/:noteId');
router.post('/notes');
router.patch('/notes/:noteId');
router.delete('notes/:noteId');
