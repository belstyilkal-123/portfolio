import express from 'express';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../controllers/achievementController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getAchievements)
  .post(protect, admin, createAchievement);

router.route('/:id')
  .put(protect, admin, updateAchievement)
  .delete(protect, admin, deleteAchievement);

export default router;
