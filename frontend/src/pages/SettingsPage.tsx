import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Sun, Moon, Monitor, Palette, Layout, Bell, Shield, User, ChevronRight, Check } from 'lucide-react';
import { useUIStore } from '../stores/useUIStore';
import { personalInfo } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const SettingSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="glass-panel rounded-3xl border border-border dark:border-zinc-800/80 overflow-hidden">
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

export const Settings: React.FC = () => {
  const { theme, setTheme, isSidebarOpen, setSidebarOpen } = useUIStore();
  const [notifications, setNotifications] = React.useState(true);
  const [animations, setAnimations] = React.useState(true);
  const [compactMode, setCompactMode] = React.useState(false);

  const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <button
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
          <h1 className="text-4xl font-extrabold text-text">Settings</h1>
        </div>
        <p className="text-text-muted ml-14">Customize your portfolio viewing experience.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 max-w-3xl"
      >
        {/* Profile Info */}
        <motion.div variants={itemVariants}>
          <SettingSection title="Profile" icon={<User size={16} />}>
            <div className="px-6 py-5 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-3xl border-2 border-primary/20 shrink-0">
                🧑‍💻
              </div>
              <div>
                <p className="text-xl font-bold text-text">{personalInfo.name}</p>
                <p className="text-text-muted">{personalInfo.role}</p>
                <p className="text-sm text-primary mt-1">{personalInfo.email}</p>
              </div>
            </div>
          </SettingSection>
        </motion.div>

        {/* Appearance */}
        <motion.div variants={itemVariants}>
          <SettingSection title="Appearance" icon={<Palette size={16} />}>
            <div className="px-6 py-5">
              <p className="text-sm font-medium text-text mb-4">Theme</p>
              <div className="grid grid-cols-3 gap-3">
                <ThemeButton
                  value="light"
                  current={theme}
                  icon={<Sun size={22} />}
                  label="Light"
                  onClick={() => setTheme('light')}
                />
                <ThemeButton
                  value="dark"
                  current={theme}
                  icon={<Moon size={22} />}
                  label="Dark"
                  onClick={() => setTheme('dark')}
                />
                <ThemeButton
                  value="system"
                  current={theme}
                  icon={<Monitor size={22} />}
                  label="System"
                  onClick={() => setTheme('system')}
                />
              </div>
            </div>
          </SettingSection>
        </motion.div>

        {/* Layout */}
        <motion.div variants={itemVariants}>
          <SettingSection title="Layout" icon={<Layout size={16} />}>
            <SettingRow label="Sidebar" description="Show the navigation sidebar">
              <Toggle checked={isSidebarOpen} onChange={() => setSidebarOpen(!isSidebarOpen)} />
            </SettingRow>
            <SettingRow label="Compact Mode" description="Reduce spacing and padding throughout the interface">
              <Toggle checked={compactMode} onChange={() => setCompactMode(!compactMode)} />
            </SettingRow>
            <SettingRow label="Animations" description="Enable motion and transition animations">
              <Toggle checked={animations} onChange={() => setAnimations(!animations)} />
            </SettingRow>
          </SettingSection>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={itemVariants}>
          <SettingSection title="Notifications" icon={<Bell size={16} />}>
            <SettingRow label="Push Notifications" description="Get notified about new blog posts and updates">
              <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} />
            </SettingRow>
          </SettingSection>
        </motion.div>

        {/* Privacy */}
        <motion.div variants={itemVariants}>
          <SettingSection title="Privacy & Data" icon={<Shield size={16} />}>
            <SettingRow label="Analytics Consent" description="Help improve the site by sharing anonymous usage data">
              <span className="text-xs text-text-muted font-medium">Not tracked</span>
            </SettingRow>
            <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors text-left group">
              <div>
                <p className="font-medium text-text text-sm">Clear Local Data</p>
                <p className="text-xs text-text-muted mt-0.5">Reset your preferences and stored settings</p>
              </div>
              <ChevronRight size={18} className="text-text-muted group-hover:text-primary transition-colors" />
            </button>
          </SettingSection>
        </motion.div>

        {/* Version info */}
        <motion.div variants={itemVariants}>
          <div className="text-center text-xs text-text-muted py-2">
            Portfolio v1.0.0 · Built with React + Node.js · Last updated Aug 2025
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
