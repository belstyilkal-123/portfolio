import express from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, admin, createService);

router.route('/:id')
  .put(protect, admin, updateService)
  .delete(protect, admin, deleteService);

export default router;
