import { Request, Response } from 'express';
import Certificate from '../models/Certificate';

export const getCertificates = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Certificate.find({}).sort({ order: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = new Certificate(req.body);
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Certificate.findById(req.params.id);
    if (item) {
      Object.assign(item, req.body);
      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data' });
  }
};

export const reorderCertificates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      res.status(400).json({ message: 'Invalid items array' });
      return;
    }
    const updatePromises = items.map((item: { id: string, order: number }) => 
      Certificate.findByIdAndUpdate(item.id, { order: item.order })
    );
    await Promise.all(updatePromises);
    res.json({ message: 'Reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Certificate.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: 'Certificate removed' });
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
