import express from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getTestimonials)
  .post(protect, admin, createTestimonial);

router.route('/:id')
  .put(protect, admin, updateTestimonial)
  .delete(protect, admin, deleteTestimonial);

export default router;
