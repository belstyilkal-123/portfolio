import express from 'express';
import multer from 'multer';
import { getMedia, uploadMedia, deleteMedia } from '../controllers/mediaController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
  .get(protect, admin, getMedia);

router.route('/upload')
  .post(protect, admin, upload.single('file'), uploadMedia);

router.delete('/*path', protect, admin, deleteMedia);

export default router;
