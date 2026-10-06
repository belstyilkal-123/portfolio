import express from 'express';
import rateLimit from 'express-rate-limit';
import { sendMessage, getMessages, markMessageAsRead } from '../controllers/messageController';
import { protect, admin } from '../middlewares/authMiddleware';
import { validateMessage } from '../middlewares/validationMiddleware';

const router = express.Router();

const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { message: 'Too many messages sent from this IP, please try again after 15 minutes' }
});

router.route('/')
  .post(messageLimiter, validateMessage, sendMessage)
  .get(protect, admin, getMessages);

router.route('/:id/read')
  .put(protect, admin, markMessageAsRead);

export default router;
