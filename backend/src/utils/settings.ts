import Setting from '../models/Setting';

export const getSettingValue = async (key: string, fallback?: string): Promise<string | undefined> => {
  const setting = await Setting.findOne({ key }).lean();
  return setting?.value ?? fallback;
};

export const upsertSettingValue = async (key: string, value: string): Promise<void> => {
  await Setting.findOneAndUpdate(
    { key },
    { value },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};
