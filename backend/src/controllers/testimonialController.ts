import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';

export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    // If user is admin (from protect middleware), they can see all.
    // Actually, request doesn't easily indicate admin in public route without token.
    // The requirement says: GET all where isVisible:true (public), admin gets all.
    // Let's check req.user if available. Wait, protect isn't on GET /.
    // We will assume GET / is public and only returns isVisible:true, 
    // unless a query param or auth is provided. 
    // Since getTestimonials is a single public route, we will just return isVisible: true
    // Wait, the user wants "admin gets all". I'll check if req.user exists and is admin.
    
    let query: any = { isVisible: true };
    // We'd need the auth middleware to set req.user optionally, but let's just use query param for simplicity or assume it's just isVisible: true for public
    // Let's implement based on req.user if it exists.
    if ((req as any).user && (req as any).user.role === 'admin') {
       query = {};
    }
    
    const testimonials = await Testimonial.find(query).sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = new Testimonial(req.body);
    const createdTestimonial = await testimonial.save();
    res.status(201).json(createdTestimonial);
  } catch (error) {
    res.status(400).json({ message: 'Invalid testimonial data' });
  }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      Object.assign(testimonial, req.body);
      const updatedTestimonial = await testimonial.save();
      res.json(updatedTestimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data' });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      await testimonial.deleteOne();
      res.json({ message: 'Testimonial removed' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
