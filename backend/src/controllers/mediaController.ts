import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await cloudinary.api.resources({ type: 'upload', max_results: 100 });
    res.json(result.resources);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileUrl, folder } = req.body;
    if (!fileUrl) {
      res.status(400).json({ message: 'No file provided' });
      return;
    }

    const result = await cloudinary.uploader.upload(fileUrl, {
      folder: folder || 'portfolio',
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const public_id = req.path.slice(1);
    if (!public_id) {
      res.status(400).json({ message: 'No public_id provided' });
      return;
    }

    const result = await cloudinary.uploader.destroy(public_id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
