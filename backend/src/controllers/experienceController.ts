import { Request, Response } from 'express';
import Experience from '../models/Experience';

export const getExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Experience.find({}).sort({ order: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = new Experience(req.body);
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Experience.findById(req.params.id);
    if (item) {
      Object.assign(item, req.body);
      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data' });
  }
};

export const reorderExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      res.status(400).json({ message: 'Invalid items array' });
      return;
    }
    const updatePromises = items.map((item: { id: string, order: number }) => 
      Experience.findByIdAndUpdate(item.id, { order: item.order })
    );
    await Promise.all(updatePromises);
    res.json({ message: 'Reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Experience.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
