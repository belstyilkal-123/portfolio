import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { Loader2, Settings as SettingsIcon, Sun, Moon, Monitor, Palette, Layout, Check, Eye, EyeOff } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import { useGitHubSettings, useSaveSettings } from '../hooks/useAdmin';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const SettingSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="glass-panel rounded-3xl border border-border dark:border-zinc-800/80 overflow-hidden mb-6">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-border dark:border-border-dark bg-zinc-50/50 dark:bg-zinc-800/30">
      <div className="p-1.5 rounded-lg bg-primary/10 text-primary">{icon}</div>
      <h2 className="font-bold text-text">{title}</h2>
    </div>
    <div className="divide-y divide-border dark:divide-border-dark">
      {children}
    </div>
  </div>
);

const SettingRow: React.FC<{ label: string; description?: string; children: React.ReactNode }> = ({ label, description, children }) => (
  <div className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
    <div>
      <p className="font-medium text-text text-sm">{label}</p>
      {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
    </div>
    <div className="shrink-0 ml-4">
      {children}
    </div>
  </div>
);

const ThemeButton: React.FC<{ value: 'light' | 'dark' | 'system'; current: string; icon: React.ReactNode; label: string; onClick: () => void }> = ({ value, current, icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm font-medium ${
      current === value
        ? 'border-primary bg-primary/10 text-primary'
        : 'border-border dark:border-zinc-700 text-text-muted hover:border-primary/50 hover:text-text'
    }`}
  >
    {icon}
    {label}
    {current === value && <Check size={14} className="text-primary" />}
  </button>
);

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
      checked ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-700'
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
        checked ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </button>
);

export const AdminSettings: React.FC = () => {
  const { data: githubData, isPending: isGithubLoading } = useGitHubSettings();
  const { mutateAsync: saveGithubSettings, isPending: isGithubSaving } = useSaveSettings();
  
  const [githubUsername, setGithubUsername] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [githubMessage, setGithubMessage] = useState<string | null>(null);

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
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

  const handleGithubSave = async () => {
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

  const handleChange = async (key: string, value: string | boolean) => {
    const stringValue = value.toString();
    setSettings(prev => ({ ...prev, [key]: stringValue }));
    
    // Instantly apply theme to admin dashboard as well so user sees the change
    if (key === 'theme') {
      localStorage.setItem('theme', stringValue);
      if (stringValue === 'dark' || (stringValue === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    // Auto-save setting
    try {
      await api.post('/settings', { key, value: stringValue });
      // Show temporary toast if needed or just silently succeed
    } catch (error) {
      console.error(`Failed to auto-save ${key}:`, error);
      setToast({ message: `Error saving ${key}`, type: 'error' });
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <SettingsIcon size={24} />
          </div>
          <h1 className="text-4xl font-extrabold text-text">Admin Settings</h1>
        </div>
        <p className="text-text-muted ml-14">Manage portfolio settings, integrations, and global appearance.</p>
      </motion.div>

      {toast && (
        <div className={`mb-6 max-w-3xl p-4 rounded-xl flex items-center ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
          {toast.message}
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl"
      >
        {/* GitHub Integration */}
        <motion.div variants={itemVariants}>
          <SettingSection title="GitHub Integration" icon={<GithubIcon size={16} />}>
            <div className="px-6 py-5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">GitHub Username</label>
                <input type="text" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)} placeholder="github.com/username" className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" disabled={isGithubLoading} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">GitHub Token</label>
                <input type="password" value={githubToken} onChange={(e) => setGithubToken(e.target.value)} placeholder="Personal access token (optional)" className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" disabled={isGithubLoading} />
                <p className="text-xs text-text-muted">A token helps avoid GitHub rate limits. Keep it private.</p>
              </div>
              {githubMessage && <div className="text-sm text-primary">{githubMessage}</div>}
              <div className="pt-2">
                <button type="button" onClick={handleGithubSave} disabled={isGithubLoading || isGithubSaving} className="px-5 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50">
                  {isGithubSaving ? 'Saving...' : 'Save GitHub Settings'}
                </button>
              </div>
            </div>
          </SettingSection>
        </motion.div>

        {/* Global Appearance */}
        <motion.div variants={itemVariants}>
          <SettingSection title="Global Appearance" icon={<Palette size={16} />}>
            <div className="px-6 py-5">
              <p className="text-sm font-medium text-text mb-4">Default Portfolio Theme</p>
              <div className="grid grid-cols-3 gap-3">
                <ThemeButton value="light" current={settings.theme || 'dark'} icon={<Sun size={22} />} label="Light" onClick={() => handleChange('theme', 'light')} />
                <ThemeButton value="dark" current={settings.theme || 'dark'} icon={<Moon size={22} />} label="Dark" onClick={() => handleChange('theme', 'dark')} />
                <ThemeButton value="system" current={settings.theme || 'dark'} icon={<Monitor size={22} />} label="System" onClick={() => handleChange('theme', 'system')} />
              </div>
            </div>
          </SettingSection>
        </motion.div>

        {/* Layout Settings */}
        <motion.div variants={itemVariants}>
          <SettingSection title="Homepage Layout" icon={<Layout size={16} />}>
            <SettingRow label="Show Hero Section" description="Display the main introductory section on the homepage">
              <Toggle checked={settings.showHero !== 'false'} onChange={() => handleChange('showHero', settings.showHero === 'false' ? 'true' : 'false')} />
            </SettingRow>
            <SettingRow label="Show Featured Projects" description="Highlight your best projects on the homepage">
              <Toggle checked={settings.showFeaturedProjects !== 'false'} onChange={() => handleChange('showFeaturedProjects', settings.showFeaturedProjects === 'false' ? 'true' : 'false')} />
            </SettingRow>
          </SettingSection>
        </motion.div>

        {/* Menu Visibility */}
        <motion.div variants={itemVariants}>
          <SettingSection title="Menu Visibility" icon={<Eye size={16} />}>
            <div className="px-6 py-5">
              <p className="text-sm text-text-muted mb-4">Toggle which sections should be visible in the public portfolio navigation menu.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {sectionsToToggle.map(section => {
                  const isHidden = hiddenSections.includes(section.toLowerCase());
                  return (
                    <button key={section} type="button" onClick={() => toggleSection(section)} className={`flex items-center justify-between p-3 rounded-xl border ${isHidden ? 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10' : 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10'} transition-colors`}>
                      <span className="font-medium text-sm">{section}</span>
                      <div className={`p-1 rounded-md ${isHidden ? 'text-red-500' : 'text-emerald-500'}`}>
                        {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </SettingSection>
        </motion.div>

        {/* Auto-saved indicator could go here if needed */}
      </motion.div>
    </div>
  );
};
