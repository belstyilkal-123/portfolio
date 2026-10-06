import { Request, Response } from 'express';
import Gallery from '../models/Gallery';

export const getGalleries = async (req: Request, res: Response) => {
  try {
    const galleries = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createGallery = async (req: Request, res: Response) => {
  try {
    const gallery = new Gallery(req.body);
    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateGallery = async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(gallery);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteGallery = async (req: Request, res: Response) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
