import express from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill, reorderSkills } from '../controllers/skillController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, admin, createSkill);

router.route('/reorder')
  .put(protect, admin, reorderSkills);

router.route('/:id')
  .put(protect, admin, updateSkill)
  .delete(protect, admin, deleteSkill);

export default router;
