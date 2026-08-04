import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Code2, Briefcase, BookOpen, Star, Clock, Target, Cpu } from 'lucide-react';

const languageStats = [
  { name: 'TypeScript/JavaScript', percent: 45, color: '#3178c6' },
  { name: 'Python', percent: 20, color: '#3572A5' },
  { name: 'Java', percent: 15, color: '#b07219' },
  { name: 'PHP', percent: 10, color: '#4F5D95' },
  { name: 'C++', percent: 10, color: '#f34b7d' },
];

const weeklyHours = [
  { day: 'Mon', hours: 3 },
  { day: 'Tue', hours: 5 },
  { day: 'Wed', hours: 2 },
  { day: 'Thu', hours: 6 },
  { day: 'Fri', hours: 4 },
  { day: 'Sat', hours: 8 },
  { day: 'Sun', hours: 5 },
];

const maxHours = Math.max(...weeklyHours.map(d => d.hours));

const overallStats = [
  { label: 'Lines of Code Written', value: '50K+', icon: Code2, color: 'text-primary' },
  { label: 'Projects Completed', value: '10+', icon: Briefcase, color: 'text-secondary' },
  { label: 'Technologies Used', value: '15+', icon: Cpu, color: 'text-accent' },
  { label: 'Blog Posts Written', value: '3', icon: BookOpen, color: 'text-purple-500' },
  { label: 'GitHub Stars Earned', value: '70+', icon: Star, color: 'text-amber-500' },
  { label: 'Hours Coded (Weekly)', value: '33h', icon: Clock, color: 'text-emerald-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Statistics: React.FC = () => {
  return (
    <div className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-6 text-sm font-medium">
          <BarChart3 size={16} />
          My Numbers
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Developer{' '}
          <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Statistics
          </span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto text-lg">
          A data-driven view of my development activity, language usage, and productivity patterns.
        </p>
      </motion.div>

      {/* Overall stats grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12"
      >
        {overallStats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-panel p-6 rounded-2xl group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`inline-flex p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-4 ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={22} />
            </div>
            <p className="text-3xl font-extrabold text-text mb-1">{stat.value}</p>
            <p className="text-sm text-text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-3xl p-8 border border-border dark:border-zinc-800/80"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-primary/10 text-primary"><Code2 size={20} /></div>
            <h2 className="text-xl font-bold">Language Distribution</h2>
          </div>

          <div className="space-y-5">
            {languageStats.map((lang, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-sm font-medium text-text">{lang.name}</span>
                  </div>
                  <span className="text-sm font-bold text-text-muted">{lang.percent}%</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1 * idx, ease: 'easeOut' }}
                    className="h-2.5 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pie chart visual representation */}
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            {languageStats.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                {lang.percent}% {lang.name.split('/')[0]}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Coding Hours */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-3xl p-8 border border-border dark:border-zinc-800/80"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary"><Clock size={20} /></div>
            <h2 className="text-xl font-bold">Weekly Coding Hours</h2>
          </div>

          <div className="flex items-end gap-3 h-40">
            {weeklyHours.map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-text">{d.hours}h</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.hours / maxHours) * 120}px` }}
                  transition={{ delay: 0.5 + idx * 0.05, duration: 0.6, ease: 'easeOut' }}
                  className="w-full bg-gradient-to-t from-secondary to-primary rounded-t-lg min-h-[4px]"
                />
                <span className="text-xs text-text-muted">{d.day}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border dark:border-border-dark flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <TrendingUp size={16} className="text-primary" />
              <span>Most productive on Saturdays</span>
            </div>
            <span className="font-bold text-text">33h total</span>
          </div>
        </motion.div>
      </div>

      {/* Goals section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 glass-panel rounded-3xl p-8 border border-border dark:border-zinc-800/80"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-accent/10 text-accent"><Target size={20} /></div>
          <h2 className="text-xl font-bold">2025 Goals Progress</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { goal: 'Reach 500+ GitHub contributions', progress: 42, current: '200+', target: '500+' },
            { goal: 'Learn Cloud Architecture (AWS)', progress: 60, current: '60%', target: '100%' },
            { goal: 'Ship 3 Open Source Projects', progress: 33, current: '1/3', target: '3' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-3">
              <p className="font-medium text-sm text-text">{item.goal}</p>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 * idx }}
                  className="h-2.5 rounded-full bg-gradient-to-r from-accent to-primary"
                />
              </div>
              <div className="flex justify-between text-xs text-text-muted">
                <span>{item.current}</span>
                <span className="font-bold text-accent">{item.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
