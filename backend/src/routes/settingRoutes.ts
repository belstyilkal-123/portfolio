import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware';
import { getSettings, upsertSetting } from '../controllers/settingController';

const router = express.Router();

router.get('/', protect, admin, getSettings);
router.post('/', protect, admin, upsertSetting);

export default router;
