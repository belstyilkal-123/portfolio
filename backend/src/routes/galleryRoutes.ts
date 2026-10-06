import express from 'express';
import { getGalleries, createGallery, updateGallery, deleteGallery } from '../controllers/galleryController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getGalleries)
  .post(protect, createGallery);

router.route('/:id')
  .put(protect, updateGallery)
  .delete(protect, deleteGallery);

export default router;
