import express from 'express';
import { authUser, registerUser } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/login', validateLogin, authUser);
router.post('/register', validateRegister, registerUser);

export default router;
