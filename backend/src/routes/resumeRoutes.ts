import express from 'express';
import { getResume, uploadResume } from '../controllers/resumeController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getResume);

router.route('/upload')
  .post(protect, admin, uploadResume);

export default router;
