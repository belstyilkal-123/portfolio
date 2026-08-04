import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Technical Skills</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        <p className="text-text-muted mt-6 max-w-2xl mx-auto">
          A comprehensive overview of my technical expertise, categorized by domain. I am constantly learning and expanding this toolkit.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {skillsData.map((category, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <h3 className="text-xl font-bold mb-6 border-b border-border dark:border-border-dark pb-2">
              {category.category}
            </h3>
            
            <div className="space-y-4">
              {category.items.map((skill, skillIdx) => (
                <div key={skillIdx}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-sm">{skill.name}</span>
                    <span className="text-sm text-text-muted">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 * skillIdx }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
