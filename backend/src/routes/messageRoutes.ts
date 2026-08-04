import express from 'express';
import { sendMessage, getMessages, markMessageAsRead } from '../controllers/messageController';
import { protect, admin } from '../middlewares/authMiddleware';
import { validateMessage } from '../middlewares/validationMiddleware';

const router = express.Router();

router.route('/')
  .post(validateMessage, sendMessage)
  .get(protect, admin, getMessages);

router.route('/:id/read')
  .put(protect, admin, markMessageAsRead);

export default router;
