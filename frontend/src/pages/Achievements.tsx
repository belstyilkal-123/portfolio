import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target, Code2, Award, CheckCircle } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'Smart Irrigation System',
    category: 'Academic Project',
    description: 'Built a full-stack IoT solution using ESP32, React, and Node.js for real-time agricultural automation.',
    icon: '🌱',
    color: 'from-emerald-500 to-teal-400',
    badge: 'IoT',
    year: '2024'
  },
  {
    id: 2,
    title: 'Networking Internship',
    category: 'Professional',
    description: 'Completed a hands-on networking internship, configuring Cisco routers and managing local area networks.',
    icon: '🌐',
    color: 'from-blue-500 to-indigo-400',
    badge: 'Networking',
    year: '2024'
  },
  {
    id: 3,
    title: 'EthioSearch Engine',
    category: 'Research',
    description: 'Developed a bilingual English-Amharic information retrieval engine using NLP and Python.',
    icon: '🔍',
    color: 'from-purple-500 to-pink-400',
    badge: 'NLP',
    year: '2024'
  },
  {
    id: 4,
    title: 'Stadium Management System',
    category: 'Database Project',
    description: 'Designed a comprehensive MySQL database system with stored procedures, triggers, and admin dashboards.',
    icon: '🏟️',
    color: 'from-orange-500 to-amber-400',
    badge: 'MySQL',
    year: '2023'
  },
  {
    id: 5,
    title: 'Full-Stack Developer',
    category: 'Skill Achievement',
    description: 'Mastered the MERN stack and built production-ready full-stack applications from scratch.',
    icon: '💻',
    color: 'from-sky-500 to-cyan-400',
    badge: 'MERN',
    year: '2023'
  },
  {
    id: 6,
    title: 'BSc IT Student – Top Cohort',
    category: 'Academic',
    description: 'Maintained strong academic performance in the BSc Information Technology program at Bahir Dar University.',
    icon: '🎓',
    color: 'from-rose-500 to-red-400',
    badge: 'Academic',
    year: '2023'
  }
];

const stats = [
  { label: 'Projects Built', value: '10+', icon: Code2 },
  { label: 'Technologies Mastered', value: '15+', icon: Zap },
  { label: 'GitHub Commits', value: '200+', icon: Target },
  { label: 'Years Coding', value: '3+', icon: Star },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Achievements: React.FC = () => {
  return (
    <div className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-6 text-sm font-medium">
          <Trophy size={16} />
          Milestones & Wins
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          My{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Achievements
          </span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto text-lg">
          A collection of milestones, projects, and accomplishments that define my journey as a developer and IT professional.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-panel p-6 rounded-2xl text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
              <stat.icon size={22} />
            </div>
            <p className="text-3xl font-extrabold text-text">{stat.value}</p>
            <p className="text-sm text-text-muted mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Achievements grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {achievements.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="glass-panel rounded-3xl overflow-hidden group cursor-default border border-border dark:border-zinc-800/80 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
          >
            {/* Gradient banner */}
            <div className={`h-2 w-full bg-gradient-to-r ${item.color}`} />

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{item.icon}</div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                    {item.badge}
                  </span>
                  <span className="text-xs text-text-muted">{item.year}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1 text-text group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                {item.category}
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                {item.description}
              </p>

              <div className="mt-5 pt-4 border-t border-border dark:border-border-dark flex items-center gap-2 text-primary text-sm font-medium">
                <CheckCircle size={16} />
                Completed
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-4 glass rounded-2xl text-text-muted text-sm border border-border dark:border-border-dark">
          <Award size={20} className="text-primary" />
          More achievements coming as I continue to learn and build. Stay tuned!
        </div>
      </motion.div>
    </div>
  );
};
