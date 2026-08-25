import { Request, Response } from 'express';
import Education from '../models/Education';

export const getEducations = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Education.find({}).sort({ order: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = new Education(req.body);
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Education.findById(req.params.id);
    if (item) {
      Object.assign(item, req.body);
      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Education not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data' });
  }
};

export const reorderEducations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      res.status(400).json({ message: 'Invalid items array' });
      return;
    }
    const updatePromises = items.map((item: { id: string, order: number }) => 
      Education.findByIdAndUpdate(item.id, { order: item.order })
    );
    await Promise.all(updatePromises);
    res.json({ message: 'Reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Education.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: 'Education removed' });
    } else {
      res.status(404).json({ message: 'Education not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
