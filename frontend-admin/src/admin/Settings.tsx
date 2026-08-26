import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Loader2, Save, Eye, EyeOff, LayoutTemplate, Palette, Sun, Moon, Monitor, Check, Shield, ArrowLeftRight } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import { useGitHubSettings, useSaveSettings } from '../hooks/useAdmin';
import { Link } from 'react-router-dom';

export const AdminSettings: React.FC = () => {
  const { data: githubData, isPending: isGithubLoading } = useGitHubSettings();
  const { mutateAsync: saveGithubSettings, isPending: isGithubSaving } = useSaveSettings();
  
  const [githubUsername, setGithubUsername] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [githubMessage, setGithubMessage] = useState<string | null>(null);

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (githubData) {
      setGithubUsername(githubData.GITHUB_USERNAME || '');
      setGithubToken(githubData.GITHUB_TOKEN || '');
    }
  }, [githubData]);

  const handleGithubSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setGithubMessage(null);

    try {
      await saveGithubSettings({
        settings: {
          GITHUB_USERNAME: githubUsername,
          GITHUB_TOKEN: githubToken,
        },
      });
      setGithubMessage('GitHub settings saved successfully.');
    } catch (error) {
      setGithubMessage('Unable to save settings. Please try again.');
    }
  };
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

  const sectionsToToggle = ['Experience', 'Education', 'Certificates', 'Skills', 'Projects', 'Blog', 'Resume', 'Gallery', 'Services'];

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-text-muted mt-2">Manage portfolio settings, integrations, and appearance.</p>
        </div>
      </div>

      {toast && (
        <div className={`mb-6 p-4 rounded-xl flex items-center ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
          {toast.message}
        </div>
      )}

      {/* GitHub Integration */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 mb-6">
        <div className="flex items-center gap-3 border-b border-border dark:border-border-dark pb-4">
          <GithubIcon size={24} />
          <h2 className="text-lg font-semibold">GitHub Integration</h2>
        </div>
        
        <form className="space-y-6" onSubmit={handleGithubSave}>
          <div className="space-y-2">
            <label htmlFor="github-username" className="text-sm font-medium text-text">GitHub Username</label>
            <input id="github-username" type="text" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)} placeholder="github.com/username" className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" disabled={isGithubLoading} />
          </div>

          <div className="space-y-2">
            <label htmlFor="github-token" className="text-sm font-medium text-text">GitHub Token</label>
            <input id="github-token" type="password" value={githubToken} onChange={(e) => setGithubToken(e.target.value)} placeholder="Personal access token (optional)" className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" disabled={isGithubLoading} />
            <p className="text-xs text-text-muted">A token is optional but helps avoid GitHub rate limits. Keep it private and don't share it publicly.</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-text-muted">
            <div className="flex items-center gap-2 font-medium text-text mb-2"><Shield size={16} /> Secure storage</div>
            Your GitHub settings are stored in the backend database for the portfolio to fetch repo metrics.
          </div>

          {githubMessage && <div className="text-sm text-center text-primary">{githubMessage}</div>}

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={isGithubLoading || isGithubSaving} className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
              <Save size={16} /> {isGithubSaving ? 'Saving...' : 'Save GitHub Settings'}
            </button>
          </div>
        </form>
      </div>

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
