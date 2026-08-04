import { Request, Response } from 'express';
import Setting from '../models/Setting';

export const getSettings = async (req: Request, res: Response): Promise<void> => {
  const settings = await Setting.find().lean();
  const result: Record<string, string> = {};
  settings.forEach((setting) => {
    result[setting.key] = setting.value;
  });
  res.json(result);
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
