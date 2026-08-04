import { Request, Response, NextFunction } from 'express';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ message: 'Invalid email format' });
    return;
  }
  next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Name, email, and password are required' });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ message: 'Invalid email format' });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ message: 'Password must be at least 6 characters long' });
    return;
  }
  next();
};

export const validateMessage = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, subject, message } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ message: 'Name is required' });
    return;
  }
  if (!email || !isValidEmail(email)) {
    res.status(400).json({ message: 'A valid email is required' });
    return;
  }
  if (!subject || !subject.trim()) {
    res.status(400).json({ message: 'Subject is required' });
    return;
  }
  if (!message || !message.trim()) {
    res.status(400).json({ message: 'Message content is required' });
    return;
  }
  next();
};

export const validateProject = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, tech, features } = req.body;
  if (!title || !title.trim()) {
    res.status(400).json({ message: 'Project title is required' });
    return;
  }
  if (!description || !description.trim()) {
    res.status(400).json({ message: 'Project description is required' });
    return;
  }
  if (!tech || !Array.isArray(tech) || tech.length === 0) {
    res.status(400).json({ message: 'At least one technology is required' });
    return;
  }
  if (features && !Array.isArray(features)) {
    res.status(400).json({ message: 'Features must be an array of strings' });
    return;
  }
  next();
};
