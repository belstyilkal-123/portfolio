import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Loader2, Save, Eye, EyeOff, LayoutTemplate, Palette, Sun, Moon, Monitor, Check } from 'lucide-react';


export const ManageAppearance: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      const settingsMap = (res.data || []).reduce((acc: any, s: any) => {
        acc[s.key] = s.value;
        return acc;
      }, {});
      setSettings(settingsMap);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value.toString() }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setToast(null);

    const keysToSave = ['accentColor', 'theme', 'showHero', 'showFeaturedProjects', 'hiddenSections'];
    
    try {
      await Promise.all(
        keysToSave.map(key => 
          api.post('/settings', { key, value: settings[key] || '' })
        )
      );
      setToast({ message: 'Appearance settings updated successfully', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      console.error(error);
      setToast({ message: 'Error updating appearance', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  const hiddenSections = (settings.hiddenSections || '').split(',').map(s => s.trim().toLowerCase());
  const toggleSection = (section: string) => {
    const sec = section.toLowerCase();
    let newHidden = [...hiddenSections];
    if (newHidden.includes(sec)) {
      newHidden = newHidden.filter(s => s !== sec);
    } else {
      newHidden.push(sec);
    }
    handleChange('hiddenSections', newHidden.filter(Boolean).join(','));
  };

  const sectionsToToggle = ['Experience', 'Education', 'Certificates', 'Skills', 'Projects', 'Blog', 'Resume', 'Gallery', 'Testimonials', 'Services'];

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Portfolio Appearance</h1>
          <p className="text-text-muted text-sm mt-1">Customize the look and feel of your public portfolio.</p>
        </div>
      </div>

      {toast && (
        <div className={`mb-6 p-4 rounded-xl flex items-center ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Colors & Theme */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-border dark:border-border-dark pb-4">
            <Palette className="text-primary" size={24} />
            <h2 className="text-lg font-semibold">Theme & Colors</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-text-muted">Accent Color (Hex Code)</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="color" 
                  value={settings.accentColor || '#10b981'} 
                  onChange={(e) => handleChange('accentColor', e.target.value)}
                  className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                />
                <input 
                  type="text" 
                  value={settings.accentColor || '#10b981'} 
                  onChange={(e) => handleChange('accentColor', e.target.value)} 
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" 
                  placeholder="#10b981" 
                />
              </div>
            </div>
            
            <div className="space-y-4 md:col-span-2 mt-4">
                <label className="text-sm font-medium text-text">Theme</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => handleChange('theme', 'light')}
                    className={`relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${
                      (settings.theme || 'dark') === 'light' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-white/10 hover:border-white/20 text-text-muted'
                    }`}
                  >
                    <Sun size={24} className="mb-3" />
                    <span className="font-medium">Light</span>
                    {(settings.theme || 'dark') === 'light' && <Check size={16} className="mt-2 text-primary" />}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleChange('theme', 'dark')}
                    className={`relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${
                      (settings.theme || 'dark') === 'dark' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-white/10 hover:border-white/20 text-text-muted'
                    }`}
                  >
                    <Moon size={24} className="mb-3" />
                    <span className="font-medium">Dark</span>
                    {(settings.theme || 'dark') === 'dark' && <Check size={16} className="mt-2 text-primary" />}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleChange('theme', 'system')}
                    className={`relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all ${
                      (settings.theme || 'dark') === 'system' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-white/10 hover:border-white/20 text-text-muted'
                    }`}
                  >
                    <Monitor size={24} className="mb-3" />
                    <span className="font-medium">System</span>
                    {(settings.theme || 'dark') === 'system' && <Check size={16} className="mt-2 text-primary" />}
                  </button>
                </div>
              </div>
          </div>
        </div>

        {/* Layout */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-border dark:border-border-dark pb-4">
            <LayoutTemplate className="text-secondary" size={24} />
            <h2 className="text-lg font-semibold">Layout Settings</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.showHero !== 'false'} 
                onChange={(e) => handleChange('showHero', e.target.checked)}
                className="w-5 h-5 rounded border-zinc-300 text-primary focus:ring-primary"
              />
              <span className="text-text font-medium">Show Hero Section on Homepage</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.showFeaturedProjects !== 'false'} 
                onChange={(e) => handleChange('showFeaturedProjects', e.target.checked)}
                className="w-5 h-5 rounded border-zinc-300 text-primary focus:ring-primary"
              />
              <span className="text-text font-medium">Show Featured Projects on Homepage</span>
            </label>
          </div>
        </div>

        {/* Visibility */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-border dark:border-border-dark pb-4">
            <Eye className="text-accent" size={24} />
            <h2 className="text-lg font-semibold">Navigation Menu Visibility</h2>
          </div>
          
          <p className="text-sm text-text-muted mb-4">Toggle which sections should be visible in the public portfolio navigation menu.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sectionsToToggle.map(section => {
              const isHidden = hiddenSections.includes(section.toLowerCase());
              return (
                <label key={section} className={`flex items-center justify-between p-4 rounded-xl border ${isHidden ? 'border-red-500/30 bg-red-500/5' : 'border-emerald-500/30 bg-emerald-500/5'} cursor-pointer transition-colors`}>
                  <span className="font-medium text-sm">{section}</span>
                  <div onClick={() => toggleSection(section)} className={`p-1.5 rounded-md ${isHidden ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                    {isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-2">
           <button type="submit" disabled={isSaving} className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
             {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Appearance
           </button>
        </div>
      </form>
    </div>
  );
};
