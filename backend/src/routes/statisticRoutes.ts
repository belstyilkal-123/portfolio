import express from 'express';
import { getStatistics, createStatistic, updateStatistic, deleteStatistic } from '../controllers/statisticController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getStatistics)
  .post(protect, createStatistic);

router.route('/:id')
  .put(protect, updateStatistic)
  .delete(protect, deleteStatistic);

export default router;
