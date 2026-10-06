import { Request, Response } from 'express';
import Timeline from '../models/Timeline';

export const getTimelines = async (req: Request, res: Response) => {
  try {
    const timelines = await Timeline.find().sort({ order: 1, year: -1 });
    res.json(timelines);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTimeline = async (req: Request, res: Response) => {
  try {
    const timeline = new Timeline(req.body);
    await timeline.save();
    res.status(201).json(timeline);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateTimeline = async (req: Request, res: Response) => {
  try {
    const timeline = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(timeline);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteTimeline = async (req: Request, res: Response) => {
  try {
    await Timeline.findByIdAndDelete(req.params.id);
    res.json({ message: 'Timeline removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
