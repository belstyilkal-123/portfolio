import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useSettingsStore } from '../stores/useSettingsStore';
import { Achievements } from './Achievements';
import { Services } from './Services';
import { FAQ } from './FAQ';
import { Timeline } from './Timeline';
import { Downloads } from './Downloads';
import { Statistics } from './Statistics';

const DynamicIcon = ({ name, size }: { name: string; size: number }) => {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <IconComponent size={size} />;
};

export const About: React.FC = () => {
  const { getSetting } = useSettingsStore();
  const bio = getSetting('bio', 'I am a software developer building full-stack applications.');
  const aboutHeading = getSetting('aboutHeading', 'Building systems with clarity and impact');

  const defaultFocusAreas = [
    { icon: 'Code2', title: 'Web Applications', detail: 'Modern, responsive interfaces built with best practices.' },
    { icon: 'Database', title: 'Backend & Databases', detail: 'Secure APIs and data models designed for scaling.' },
    { icon: 'Network', title: 'Networking', detail: 'Core network configuration and systems connectivity.' },
    { icon: 'Cpu', title: 'IoT Solutions', detail: 'Embedded systems with real-time monitoring and automation.' }
  ];

  const defaultStrengths = [
    'Full-stack development with React and Node.js',
    'Database design for MongoDB and MySQL',
    'Hands-on experience with IoT and ESP32 development',
    'Clear communication and reliable delivery'
  ];

  const focusAreas = useMemo(() => {
    const saved = getSetting('aboutFocusAreas', '');
    if (!saved) return defaultFocusAreas;
    try {
      return JSON.parse(saved);
    } catch {
      return defaultFocusAreas;
    }
  }, [getSetting, defaultFocusAreas, defaultStrengths]);

  const strengths = useMemo(() => {
    const saved = getSetting('aboutStrengths', 'DEFAULT');
    console.log('saved aboutStrengths:', saved);
    if (saved === 'DEFAULT') return defaultStrengths;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // not JSON
    }
    return saved.split('\n').map((s: string) => s.trim()).filter(Boolean);
  }, [getSetting, defaultFocusAreas, defaultStrengths]);


  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-primary font-semibold mb-4">Professional Spotlight</p>
        <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="glass-panel p-10 rounded-[2rem] border border-border dark:border-border-dark shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight bg-gradient-to-br from-text to-text-muted bg-clip-text text-transparent dark:from-white dark:to-zinc-400">
            {aboutHeading}
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg md:text-xl text-text-muted leading-loose whitespace-pre-wrap font-medium">
              {bio}
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {strengths.map((strength: string, index: number) => (
              <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }} key={index} className="flex gap-4 items-center group">
                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <LucideIcons.Check size={16} />
                </span>
                <p className="text-lg text-text-muted group-hover:text-text transition-colors duration-300 font-medium">{strength}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid gap-5"
        >
          {focusAreas.map((area: { icon: string; title: string; detail: string }) => (
            <div key={area.title} className="glass p-6 rounded-3xl border border-border dark:border-border-dark shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <DynamicIcon name={area.icon} size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
              <p className="text-text-muted leading-relaxed">{area.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-24">
        <Services />
      </div>

      <div className="mt-24">
        <Achievements />
      </div>

      <div className="mt-24">
        <Timeline />
      </div>

      <div className="mt-24">
        <Statistics />
      </div>

      <div className="mt-24">
        <FAQ />
      </div>

      <div className="mt-24">
        <Downloads />
      </div>
    </div>
  );
};
