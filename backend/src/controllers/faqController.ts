import { Request, Response } from 'express';
import FAQ from '../models/FAQ';

export const getFAQs = async (req: Request, res: Response): Promise<void> => {
  try {
    const faqs = await FAQ.find({}).sort({ order: 1, createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createFAQ = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = new FAQ(req.body);
    const created = await faq.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateFAQ = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (faq) {
      res.json(faq);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteFAQ = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (faq) {
      await faq.deleteOne();
      res.json({ message: 'Removed' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
