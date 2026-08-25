import { create } from 'zustand';

interface SettingsState {
  settings: Record<string, string>;
  setSettings: (settings: Record<string, string>) => void;
  getSetting: (key: string, defaultValue?: string) => string;
  isSectionHidden: (sectionLabel: string) => boolean;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: {},
  setSettings: (settings) => set({ settings }),
  getSetting: (key, defaultValue = '') => get().settings[key] || defaultValue,
  isSectionHidden: (sectionLabel) => {
    const hiddenStr = get().settings['hiddenSections'] || '';
    const hiddenArr = hiddenStr.split(',').map(s => s.trim().toLowerCase());
    return hiddenArr.includes(sectionLabel.toLowerCase());
  }
}));
