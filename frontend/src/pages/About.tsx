import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useSettingsStore } from '../stores/useSettingsStore';
import { Services } from './Services';
import { Achievements } from './Achievements';
import { Timeline } from './Timeline';
import { FAQ } from './FAQ';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, User, Layers, Trophy, Clock, HelpCircle } from 'lucide-react';
import { usePopSound } from '../hooks/usePopSound';

const DynamicIcon = ({ name, size }: { name: string; size: number }) => {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <IconComponent size={size} />;
};

export const About: React.FC = () => {
  const { getSetting } = useSettingsStore();
  const playPop = usePopSound();
  const [activeTab, setActiveTab] = useState<'services' | 'milestones' | 'journey' | 'faq'>('services');

  const bio = getSetting('bio', 'I am a software developer building full-stack applications with clean architecture, modern frontend frameworks, and robust backends.');
  const aboutHeading = getSetting('aboutHeading', 'Building systems with clarity, speed, and real-world impact');

  const defaultFocusAreas = [
    { icon: 'Code2', title: 'Web Applications', detail: 'Modern, responsive interfaces built with React, TypeScript, and modern CSS frameworks.' },
    { icon: 'Database', title: 'Backend & Databases', detail: 'Scalable RESTful microservices and data pipelines designed with Node.js and MongoDB.' },
    { icon: 'Network', title: 'Networking & Systems', detail: 'Network configuration, protocols, and reliable distributed systems connectivity.' },
    { icon: 'Cpu', title: 'IoT & Edge Computing', detail: 'Embedded systems with ESP32 microcontrollers, MQTT streaming, and sensor automation.' }
  ];

  const defaultStrengths = [
    'Full-stack application development with React and Node.js',
    'Schema design & query optimization for MongoDB & SQL',
    'Hands-on firmware development with ESP32 & C++',
    'Responsive, mobile-first design across all form factors',
    'Clear communication, ownership, and dependable execution'
  ];

  const focusAreas = useMemo(() => {
    const saved = getSetting('aboutFocusAreas', '');
    if (!saved) return defaultFocusAreas;
    try {
      return JSON.parse(saved);
    } catch {
      return defaultFocusAreas;
    }
  }, [getSetting]);

  const strengths = useMemo(() => {
    const saved = getSetting('aboutStrengths', 'DEFAULT');
    if (saved === 'DEFAULT') return defaultStrengths;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // not JSON
    }
    return saved.split('\n').map((s: string) => s.trim()).filter(Boolean);
  }, [getSetting]);

  const tabs = [
    { id: 'services' as const, label: 'Services', icon: Layers, link: '/services' },
    { id: 'milestones' as const, label: 'Milestones', icon: Trophy, link: '/achievements' },
    { id: 'journey' as const, label: 'Timeline', icon: Clock, link: '/timeline' },
    { id: 'faq' as const, label: 'FAQ', icon: HelpCircle, link: '/faq' },
  ];

  return (
    <div className="py-4 sm:py-8 space-y-12 sm:space-y-16">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <User size={16} />
          <span>Professional Profile & Background</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          About{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Belstie Yilkal
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
      </motion.div>

      {/* Main Bio and Focus Areas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Left: Bio & Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-border dark:border-border-dark flex flex-col justify-between"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 leading-tight text-text">
              {aboutHeading}
            </h2>
            <div className="text-sm sm:text-base text-text-muted leading-relaxed whitespace-pre-wrap">
              {bio}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/80 dark:border-border-dark/80">
            <h3 className="text-xs uppercase tracking-wider font-bold text-text-muted mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-primary" /> Core Competencies:
            </h3>
            
            <div className="space-y-3">
              {strengths.map((strength: string, index: number) => (
                <div key={index} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-text">
                  <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full bg-primary/15 text-primary mt-0.5">
                    <Check size={12} />
                  </span>
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Specialized Focus Areas */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
        >
          {focusAreas.map((area: { icon: string; title: string; detail: string }) => (
            <div 
              key={area.title} 
              className="glass-panel p-5 sm:p-6 rounded-2xl border border-border dark:border-border-dark hover:border-primary/40 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                  <DynamicIcon name={area.icon} size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-text group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed pl-13">
                {area.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Interactive Showcase Tabs */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-border dark:border-border-dark">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/80 dark:border-border-dark/80">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Discover More</span>
            <h2 className="text-2xl font-bold text-text mt-1">Explore Experience & Offerings</h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { playPop(); setActiveTab(tab.id); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-sm shadow-primary/20'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'services' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-xs sm:text-sm text-text-muted">Engineering services & consulting I provide</p>
                    <Link to="/services" onClick={playPop} className="text-xs sm:text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                      Full Services Page <ArrowRight size={14} />
                    </Link>
                  </div>
                  <Services />
                </div>
              )}

              {activeTab === 'milestones' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-xs sm:text-sm text-text-muted">Key accomplishments, hackathons, and certifications</p>
                    <Link to="/achievements" onClick={playPop} className="text-xs sm:text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                      Full Achievements Page <ArrowRight size={14} />
                    </Link>
                  </div>
                  <Achievements />
                </div>
              )}

              {activeTab === 'journey' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-xs sm:text-sm text-text-muted">Career progression and milestones over the years</p>
                    <Link to="/timeline" onClick={playPop} className="text-xs sm:text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                      Full Timeline Page <ArrowRight size={14} />
                    </Link>
                  </div>
                  <Timeline />
                </div>
              )}

              {activeTab === 'faq' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-xs sm:text-sm text-text-muted">Frequently asked questions regarding collaboration and skills</p>
                    <Link to="/faq" onClick={playPop} className="text-xs sm:text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                      Full FAQ Page <ArrowRight size={14} />
                    </Link>
                  </div>
                  <FAQ />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
};
