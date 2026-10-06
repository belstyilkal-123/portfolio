import { Request, Response } from 'express';
import Service from '../models/Service';

export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find({}).sort({ order: 1, createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = new Service(req.body);
    const created = await service.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      await service.deleteOne();
      res.json({ message: 'Removed' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
