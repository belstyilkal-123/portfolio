import express from 'express';
import { getTimelines, createTimeline, updateTimeline, deleteTimeline } from '../controllers/timelineController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getTimelines)
  .post(protect, createTimeline);

router.route('/:id')
  .put(protect, updateTimeline)
  .delete(protect, deleteTimeline);

export default router;
