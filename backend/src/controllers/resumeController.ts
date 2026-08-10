import { Request, Response } from 'express';
import Setting from '../models/Setting';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const setting = await Setting.findOne({ key: 'resume_url' });
    if (setting) {
      res.json({ url: setting.value });
    } else {
      res.status(404).json({ message: 'Resume not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const uploadResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileUrl } = req.body;
    if (!fileUrl) {
      res.status(400).json({ message: 'No file provided' });
      return;
    }

    const uploadResponse = await cloudinary.uploader.upload(fileUrl, {
      resource_type: 'raw',
      folder: 'portfolio/resume'
    });

    const setting = await Setting.findOneAndUpdate(
      { key: 'resume_url' },
      { value: uploadResponse.secure_url },
      { new: true, upsert: true }
    );

    res.json({ url: setting.value });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
