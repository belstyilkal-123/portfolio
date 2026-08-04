import { Request, Response } from 'express';
import Message from '../models/Message';

// @desc    Send a message (Contact form)
// @route   POST /api/messages
// @access  Public
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const { name, email, subject, message } = req.body;

  const newMessage = new Message({
    name,
    email,
    subject,
    message,
  });

  const createdMessage = await newMessage.save();
  res.status(201).json(createdMessage);
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
export const getMessages = async (req: Request, res: Response): Promise<void> => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
export const markMessageAsRead = async (req: Request, res: Response): Promise<void> => {
  const message = await Message.findById(req.params.id);

  if (message) {
    message.isRead = true;
    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } else {
    res.status(404).json({ message: 'Message not found' });
  }
};
