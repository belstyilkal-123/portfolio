import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkills } from '../hooks/useResume';
import { Sparkles, Code2, Server, Database, Cpu, Wrench } from 'lucide-react';
import { usePopSound } from '../hooks/usePopSound';

const defaultSkills = [
  { name: 'React.js / Next.js', category: 'Frontend', proficiency: 92 },
  { name: 'TypeScript & JavaScript', category: 'Frontend', proficiency: 90 },
  { name: 'Tailwind CSS & Modern UI', category: 'Frontend', proficiency: 95 },
  { name: 'Framer Motion & Animation', category: 'Frontend', proficiency: 85 },
  { name: 'Node.js & Express.js', category: 'Backend', proficiency: 88 },
  { name: 'RESTful API Engineering', category: 'Backend', proficiency: 90 },
  { name: 'Authentication & Middleware', category: 'Backend', proficiency: 84 },
  { name: 'MongoDB & Aggregation', category: 'Databases', proficiency: 86 },
  { name: 'MySQL & Relational Design', category: 'Databases', proficiency: 82 },
  { name: 'ESP32 & C++ Firmware', category: 'IoT & Hardware', proficiency: 88 },
  { name: 'MQTT & Sensor Automation', category: 'IoT & Hardware', proficiency: 86 },
  { name: 'Git, GitHub & CI/CD', category: 'DevOps & Tools', proficiency: 90 },
  { name: 'Docker & Microservices', category: 'DevOps & Tools', proficiency: 78 },
];

const categoryIcons: Record<string, any> = {
  'Frontend': Code2,
  'Backend': Server,
  'Databases': Database,
  'IoT & Hardware': Cpu,
  'DevOps & Tools': Wrench,
};

export const Skills: React.FC = () => {
  const { data: skillsData = [], isLoading } = useSkills();
  const playPop = usePopSound();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const activeSkills = skillsData.length > 0 ? skillsData : defaultSkills;

  // Group skills by category
  const groupedSkills = activeSkills.reduce((acc: Record<string, any[]>, skill: any) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const allCategories = ['All', ...Object.keys(groupedSkills).sort()];
  const displayedCategories = selectedCategory === 'All' 
    ? Object.keys(groupedSkills).sort() 
    : [selectedCategory];

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col justify-center items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <p className="text-sm text-text-muted">Loading technical toolkit...</p>
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
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <Sparkles size={16} />
          <span>Core Capabilities & Stack</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Technical{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Skills
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          A breakdown of my software engineering capabilities, frameworks, database systems, and embedded hardware tools.
        </p>
      </motion.div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => { playPop(); setSelectedCategory(cat); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {displayedCategories.map((category) => {
            const Icon = categoryIcons[category] || Code2;
            const skillsInCat = groupedSkills[category] || [];

            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border dark:border-border-dark flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border/80 dark:border-border-dark/80">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text uppercase tracking-wider">
                        {category}
                      </h3>
                      <p className="text-xs text-text-muted">{skillsInCat.length} skills listed</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {skillsInCat.map((skill: any, skillIdx: number) => (
                      <div key={skillIdx}>
                        <div className="flex justify-between items-center mb-1.5 text-xs sm:text-sm">
                          <span className="font-semibold text-text">{skill.name}</span>
                          <span className="text-text-muted font-medium">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden border border-border/40 dark:border-border-dark/40">
                          <motion.div 
                            className="bg-gradient-to-r from-primary via-emerald-400 to-secondary h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.05 * skillIdx }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border/60 dark:border-border-dark/60 text-[11px] text-text-muted flex items-center justify-between">
                  <span>Continuous learning</span>
                  <span className="text-primary font-semibold">Active stack</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
};
