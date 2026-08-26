import { Request, Response } from 'express';
import Setting from '../models/Setting';

import jwt from 'jsonwebtoken';
import User from '../models/User';

export const getSettings = async (req: Request, res: Response): Promise<void> => {
  let isAdmin = false;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      const user = await User.findById(decoded.id).select('-password');
      if (user && user.isAdmin) isAdmin = true;
    } catch (e) {
      console.error('Settings auth error:', e);
    }
  }

  const settings = await Setting.find().lean();
  
  if (!isAdmin) {
    const publicSettings = settings.filter(s => !['GITHUB_TOKEN'].includes(s.key));
    res.json(publicSettings);
    return;
  }
  
  res.json(settings);
};

export const upsertSetting = async (req: Request, res: Response): Promise<void> => {
  const { key, value, settings } = req.body;

  if (settings && typeof settings === 'object') {
    const updatedSettings = await Promise.all(
      Object.entries(settings).map(async ([settingKey, settingValue]) => {
        return Setting.findOneAndUpdate(
          { key: settingKey },
          { value: String(settingValue) },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      })
    );
    res.json(updatedSettings);
    return;
  }

  if (!key) {
    res.status(400).json({ message: 'Setting key is required.' });
    return;
  }

  const setting = await Setting.findOneAndUpdate(
    { key },
    { value },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.json(setting);
};
