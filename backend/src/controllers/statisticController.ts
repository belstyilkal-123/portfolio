import { Request, Response } from 'express';
import Statistic from '../models/Statistic';

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const statistics = await Statistic.find().sort({ order: 1 });
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createStatistic = async (req: Request, res: Response) => {
  try {
    const statistic = new Statistic(req.body);
    await statistic.save();
    res.status(201).json(statistic);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateStatistic = async (req: Request, res: Response) => {
  try {
    const statistic = await Statistic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(statistic);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteStatistic = async (req: Request, res: Response) => {
  try {
    await Statistic.findByIdAndDelete(req.params.id);
    res.json({ message: 'Statistic removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
