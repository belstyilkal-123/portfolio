import express from 'express';
import { getDownloads, createDownload, updateDownload, deleteDownload } from '../controllers/downloadController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getDownloads)
  .post(protect, createDownload);

router.route('/:id')
  .put(protect, updateDownload)
  .delete(protect, deleteDownload);

export default router;
