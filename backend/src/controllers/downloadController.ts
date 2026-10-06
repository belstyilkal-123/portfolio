import { Request, Response } from 'express';
import Download from '../models/Download';

export const getDownloads = async (req: Request, res: Response) => {
  try {
    const downloads = await Download.find().sort({ order: 1, createdAt: -1 });
    res.json(downloads);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createDownload = async (req: Request, res: Response) => {
  try {
    const download = new Download(req.body);
    await download.save();
    res.status(201).json(download);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateDownload = async (req: Request, res: Response) => {
  try {
    const download = await Download.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(download);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteDownload = async (req: Request, res: Response) => {
  try {
    await Download.findByIdAndDelete(req.params.id);
    res.json({ message: 'Download removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
