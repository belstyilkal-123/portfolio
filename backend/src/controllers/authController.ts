import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await (user as any).matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Register a new user (Usually disabled in a personal portfolio, but kept for setup)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: true, // First user is admin for portfolio setup
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).json({ message: 'There is no user with that email' });
    return;
  }

  // Get reset token
  const resetToken = (user as any).getResetPasswordToken();

  await user.save();

  // Create reset url
  // Note: We use VITE_PORTFOLIO_URL or infer from req origin in production
  // We'll rely on the frontend to pass the origin, or just use a relative path if they are on same domain
  const origin = req.headers.origin || 'http://localhost:5174'; 
  const resetUrl = `${origin}/admin/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    const sendEmail = require('../utils/sendEmail').default;
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    // Fallback: If email fails to send (e.g. no credentials in .env), we print the URL to the console
    // This allows the admin to reset the password during development or if SMTP isn't configured
    console.warn('Failed to send email. Reset URL is:', resetUrl);
    res.status(200).json({ success: true, data: 'Email sending failed, check server logs for link' });
  }
};

// @desc    Reset Password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const crypto = require('crypto');
  
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({ message: 'Invalid or expired token' });
    return;
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    token: generateToken(user._id.toString()),
  });
};
