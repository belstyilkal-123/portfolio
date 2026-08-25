import express from 'express';
import { getEducations, createEducation, updateEducation, deleteEducation, reorderEducations } from '../controllers/educationController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getEducations)
  .post(protect, admin, createEducation);

router.route('/reorder')
  .put(protect, admin, reorderEducations);

router.route('/:id')
  .put(protect, admin, updateEducation)
  .delete(protect, admin, deleteEducation);

export default router;
