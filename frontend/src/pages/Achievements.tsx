import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target, Code2, Award, CheckCircle } from 'lucide-react';
import { useAchievements } from '../hooks/useContent';

const stats = [
  { label: 'Projects Built', value: '10+', icon: Code2 },
  { label: 'Tech Stack Tools', value: '15+', icon: Zap },
  { label: 'GitHub Commits', value: '300+', icon: Target },
  { label: 'Years Coding', value: '2+ yrs', icon: Star },
];

const defaultAchievements = [
  {
    _id: '1',
    icon: '🏆',
    title: 'Top IoT Innovation Prototype',
    category: 'Technology Showcase',
    description: 'Engineered an end-to-end edge-to-cloud environmental monitoring prototype utilizing ESP32, MQTT telemetry, and a custom React analytics dashboard.',
    badge: 'Showcase Winner',
    year: '2024',
    color: 'from-amber-400 to-orange-500'
  },
  {
    _id: '2',
    icon: '🚀',
    title: 'Enterprise Portfolio & Admin System',
    category: 'Full-Stack Engineering',
    description: 'Architected a monorepo featuring a decoupled Node.js API, JWT authentication, and dual React interfaces for public and admin operations.',
    badge: 'Production',
    year: '2024',
    color: 'from-primary to-emerald-600'
  },
  {
    _id: '3',
    icon: '🎓',
    title: 'Academic Excellence in IT',
    category: 'Bahir Dar University',
    description: 'Maintained top academic standing across core Computer Science and Information Technology coursework.',
    badge: 'Honors',
    year: '2023 - Present',
    color: 'from-blue-500 to-indigo-600'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const Achievements: React.FC = () => {
  const { data: achievements = [], isLoading } = useAchievements();

  const activeAchievements = achievements.length > 0 ? achievements : defaultAchievements;

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
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-4 text-xs sm:text-sm font-medium">
          <Trophy size={16} />
          <span>Milestones & Wins</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          My{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Achievements
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-red-400 mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Key milestones, technical accomplishments, and recognitions earned along my engineering journey.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border dark:border-border-dark flex flex-col items-center justify-center"
          >
            <div className="inline-flex p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
              <stat.icon size={20} />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-text">{stat.value}</p>
            <p className="text-xs sm:text-sm text-text-muted mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Achievements grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {activeAchievements.map((item) => (
          <motion.div
            key={item._id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="glass-panel rounded-2xl sm:rounded-3xl overflow-hidden group border border-border dark:border-border-dark hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Gradient banner */}
            <div className={`h-2 w-full bg-gradient-to-r ${item.color || 'from-primary to-secondary'}`} />

            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl sm:text-4xl">{item.icon || '🏅'}</span>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r ${item.color || 'from-primary to-secondary'} text-white`}>
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-text-muted">{item.year}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-text group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mt-1 mb-2">
                  {item.category}
                </p>
                
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/80 dark:border-border-dark/80 flex items-center gap-2 text-primary text-xs sm:text-sm font-semibold">
                <CheckCircle size={15} />
                <span>Verified Milestone</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2.5 px-5 py-3 glass rounded-2xl text-text-muted text-xs sm:text-sm border border-border dark:border-border-dark">
          <Award size={18} className="text-primary" />
          <span>Continuously pushing boundaries and solving complex problems.</span>
        </div>
      </motion.div>
    </div>
  );
};
