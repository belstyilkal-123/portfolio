import express from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience, reorderExperiences } from '../controllers/experienceController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getExperiences)
  .post(protect, admin, createExperience);

router.route('/reorder')
  .put(protect, admin, reorderExperiences);

router.route('/:id')
  .put(protect, admin, updateExperience)
  .delete(protect, admin, deleteExperience);

export default router;
