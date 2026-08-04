import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware';
import { getAdminStats } from '../controllers/adminController';

const router = express.Router();

router.get('/stats', protect, admin, getAdminStats);

export default router;
