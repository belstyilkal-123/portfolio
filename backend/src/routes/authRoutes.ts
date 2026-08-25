import express from 'express';
import { authUser, registerUser, forgotPassword, resetPassword } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/login', validateLogin, authUser);
router.post('/register', validateRegister, registerUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

export default router;
