import { Request, Response } from 'express';
import Achievement from '../models/Achievement';

export const getAchievements = async (req: Request, res: Response): Promise<void> => {
  try {
    const achievements = await Achievement.find({}).sort({ order: 1, createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const achievement = new Achievement(req.body);
    const created = await achievement.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (achievement) {
      res.json(achievement);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (achievement) {
      await achievement.deleteOne();
      res.json({ message: 'Removed' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
