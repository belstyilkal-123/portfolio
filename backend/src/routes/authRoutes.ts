import express from 'express';
import { authUser, registerUser, resetPassword } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/login', validateLogin, authUser);
router.post('/register', validateRegister, registerUser);
router.post('/reset-password', resetPassword);

export default router;
