import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Loader2 } from 'lucide-react';
import api from '../api/client';

export const Education: React.FC = () => {
  const [educationData, setEducationData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/education');
        setEducationData(res.data || []);
      } catch (error) {
        console.error('Failed to fetch education', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  const renderIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName] || LucideIcons.GraduationCap;
    return <Icon size={20} />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Education</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        <p className="text-text-muted mt-6 max-w-2xl mx-auto">
          My academic journey and educational background.
        </p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
        <div className="relative border-l-2 border-primary/30 ml-4 md:ml-0 md:pl-8 space-y-12">
          {educationData.map((edu, idx) => (
            <motion.div key={idx} variants={itemVariants} className="relative pl-8 md:pl-0">
              <div className="absolute w-10 h-10 bg-surface dark:bg-surface-dark border-4 border-primary rounded-full -left-[44px] md:-left-[52px] flex items-center justify-center text-primary shadow-lg shadow-primary/20">
                {renderIcon(edu.icon)}
              </div>
              
              <div className="glass-panel p-6 md:p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                  {edu.timeline}
                </span>
                <h3 className="text-2xl font-bold mb-1">{edu.degree}</h3>
                <h4 className="text-lg text-secondary font-medium mb-4">{edu.school}</h4>
                <p className="text-text-muted leading-relaxed whitespace-pre-wrap">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
          {educationData.length === 0 && (
            <div className="text-center py-12 text-text-muted">No education entries available.</div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
