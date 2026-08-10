import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader2, Save, UserCircle } from 'lucide-react';

export const ManageProfile: React.FC = () => {
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

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setToast(null);

    const keysToSave = ['name', 'bio', 'tagline', 'location', 'avatarUrl', 'githubUrl', 'linkedinUrl', 'twitterUrl', 'email'];
    
    try {
      // Save them sequentially or adapt to backend's batch save if available.
      // Based on typical controller, we POST { key, value }
      await Promise.all(
        keysToSave.map(key => 
          api.post('/settings', { key, value: settings[key] || '' })
        )
      );
      setToast({ message: 'Profile updated successfully', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      console.error(error);
      setToast({ message: 'Error updating profile', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Profile</h1>
          <p className="text-text-muted text-sm mt-1">Update your personal information and links.</p>
        </div>
      </div>

      {toast && (
        <div className={`mb-6 p-4 rounded-xl flex items-center ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="w-full sm:w-1/3 flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-4 border-surface shadow-xl flex items-center justify-center">
               {settings.avatarUrl ? (
                 <img src={settings.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
               ) : (
                 <UserCircle size={64} className="text-zinc-400" />
               )}
            </div>
            <div className="w-full space-y-2">
              <label className="text-sm font-medium text-text-muted text-center block">Avatar URL</label>
              <input value={settings.avatarUrl || ''} onChange={(e) => handleChange('avatarUrl', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text text-sm" placeholder="https://..." />
            </div>
          </div>

          <div className="w-full sm:w-2/3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Full Name</label>
                <input value={settings.name || ''} onChange={(e) => handleChange('name', e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Public Email</label>
                <input value={settings.email || ''} onChange={(e) => handleChange('email', e.target.value)} type="email" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Tagline</label>
                <input value={settings.tagline || ''} onChange={(e) => handleChange('tagline', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" placeholder="Full Stack Developer" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Location</label>
                <input value={settings.location || ''} onChange={(e) => handleChange('location', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" placeholder="City, Country" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Bio</label>
              <textarea value={settings.bio || ''} onChange={(e) => handleChange('bio', e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text resize-y" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border dark:border-border-dark space-y-4">
          <h3 className="text-lg font-semibold">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">GitHub</label>
                <input value={settings.githubUrl || ''} onChange={(e) => handleChange('githubUrl', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">LinkedIn</label>
                <input value={settings.linkedinUrl || ''} onChange={(e) => handleChange('linkedinUrl', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Twitter/X</label>
                <input value={settings.twitterUrl || ''} onChange={(e) => handleChange('twitterUrl', e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
             </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-border dark:border-border-dark">
           <button type="submit" disabled={isSaving} className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
             {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Profile
           </button>
        </div>
      </form>
    </div>
  );
};
