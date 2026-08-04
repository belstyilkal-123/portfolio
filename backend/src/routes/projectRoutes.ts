import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { protect, admin } from '../middlewares/authMiddleware';
import { validateProject } from '../middlewares/validationMiddleware';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, admin, validateProject, createProject);

router.route('/:id')
  .put(protect, admin, validateProject, updateProject)
  .delete(protect, admin, deleteProject);

export default router;
