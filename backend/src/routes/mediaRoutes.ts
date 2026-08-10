import express from 'express';
import { getMedia, uploadMedia, deleteMedia } from '../controllers/mediaController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, admin, getMedia);

router.route('/upload')
  .post(protect, admin, uploadMedia);

router.delete('/*', protect, admin, deleteMedia);

export default router;
