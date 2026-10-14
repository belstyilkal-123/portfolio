import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Code2, Clock } from 'lucide-react';
import { useStatistics } from '../hooks/useContent';
import * as Icons from 'lucide-react';

const defaultOverallStats = [
  { _id: '1', label: 'Completed Projects', value: '12+', icon: 'Code2' },
  { _id: '2', label: 'Hours Coded (2024)', value: '1,200+', icon: 'Clock' },
  { _id: '3', label: 'Tech Stack Fluency', value: '10+ tools', icon: 'Cpu' },
  { _id: '4', label: 'Code Review Score', value: '98%', icon: 'ShieldCheck' },
  { _id: '5', label: 'GitHub Commits', value: '300+', icon: 'GitCommit' },
  { _id: '6', label: 'Client Satisfaction', value: '100%', icon: 'Award' },
];

const languageStats = [
  { name: 'TypeScript / React', percent: 45, color: '#10B981' },
  { name: 'Node.js & Express', percent: 25, color: '#2563EB' },
  { name: 'C++ & ESP32 IoT', percent: 15, color: '#F97316' },
  { name: 'MongoDB & SQL', percent: 10, color: '#8B5CF6' },
  { name: 'Python & Scripting', percent: 5, color: '#EC4899' },
];

const weeklyHours = [
  { day: 'Mon', hours: 4 },
  { day: 'Tue', hours: 6 },
  { day: 'Wed', hours: 5 },
  { day: 'Thu', hours: 7 },
  { day: 'Fri', hours: 6 },
  { day: 'Sat', hours: 9 },
  { day: 'Sun', hours: 5 },
];

const maxHours = Math.max(...weeklyHours.map(d => d.hours));

export const Statistics: React.FC = () => {
  const { data: overallStats = [], isLoading } = useStatistics();

  const activeStats = overallStats.length > 0 ? overallStats : defaultOverallStats;

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 space-y-8 sm:space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-4 text-xs sm:text-sm font-medium">
          <BarChart3 size={16} />
          <span>Productivity Metrics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Developer{' '}
          <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Statistics
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Quantifiable insights into my development cadence, technical language distribution, and engineering output.
        </p>
      </motion.div>

      {/* Overall stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {activeStats.map((stat: any) => {
          const IconComponent = (Icons as any)[stat.icon] || Icons.Code2;
          return (
            <div
              key={stat._id}
              className="glass-panel p-4 rounded-2xl border border-border dark:border-border-dark flex flex-col items-center text-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary mb-2">
                <IconComponent size={18} />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-text mt-1">{stat.value}</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-tight">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Language Distribution */}
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-border dark:border-border-dark">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-xl bg-primary/10 text-primary"><Code2 size={18} /></div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-text">Codebase Language Share</h2>
              <p className="text-xs text-text-muted">Breakdown across active repositories & projects</p>
            </div>
          </div>

          <div className="space-y-4">
            {languageStats.map((lang, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 font-semibold text-text">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span>{lang.name}</span>
                  </div>
                  <span className="text-text-muted font-bold">{lang.percent}%</span>
                </div>
                
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden border border-border/40 dark:border-border-dark/40">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.05 * idx, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Coding Hours */}
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-border dark:border-border-dark flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-xl bg-secondary/10 text-secondary"><Clock size={18} /></div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-text">Weekly Focus Time</h2>
                <p className="text-xs text-text-muted">Average hours devoted to engineering tasks</p>
              </div>
            </div>

            <div className="flex items-end gap-2 sm:gap-4 h-32 sm:h-36 pt-4">
              {weeklyHours.map((d, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-bold text-text">{d.hours}h</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.hours / maxHours) * 90}px` }}
                    transition={{ delay: 0.1 * idx, duration: 0.6, ease: 'easeOut' }}
                    className="w-full bg-gradient-to-t from-secondary to-primary rounded-t-lg min-h-[6px]"
                  />
                  <span className="text-[11px] sm:text-xs text-text-muted font-medium">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/80 dark:border-border-dark/80 flex items-center justify-between text-xs text-text-muted">
            <div className="flex items-center gap-1.5 font-medium">
              <TrendingUp size={14} className="text-primary" />
              <span>Peak output on weekends & evening sprints</span>
            </div>
            <span className="font-bold text-text">42h avg / week</span>
          </div>
        </div>
      </div>

    </div>
  );
};
