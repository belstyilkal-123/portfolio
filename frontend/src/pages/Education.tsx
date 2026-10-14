import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Loader2, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { apiClient as api } from '../api/client';

const defaultEducation = [
  {
    degree: 'BSc in Information Technology',
    school: 'Bahir Dar University',
    timeline: '2022 - 2026 (Expected)',
    description: 'Comprehensive degree covering software engineering, data structures and algorithms, object-oriented programming, computer networks, database management systems, and cybersecurity fundamentals.',
    icon: 'GraduationCap'
  },
  {
    degree: 'High School Diploma (Natural Sciences)',
    school: 'Secondary Education',
    timeline: '2018 - 2022',
    description: 'Graduated with strong foundations in mathematics, physics, and introductory computer science.',
    icon: 'BookOpen'
  }
];

export const Education: React.FC = () => {
  const [educationData, setEducationData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/education');
        if (res.data && res.data.length > 0) {
          setEducationData(res.data);
        } else {
          setEducationData(defaultEducation);
        }
      } catch (error) {
        console.error('Failed to fetch education', error);
        setEducationData(defaultEducation);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName] || LucideIcons.GraduationCap;
    return <Icon size={18} />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 max-w-4xl mx-auto space-y-8 sm:space-y-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-4 text-xs sm:text-sm font-medium">
          <GraduationCap size={16} />
          <span>Academic Background</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Education &{' '}
          <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Academics
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 max-w-xl mx-auto leading-relaxed">
          My academic qualifications, higher education degree coursework, and foundational studies.
        </p>
      </motion.div>

      {/* Responsive Timeline */}
      <div className="relative border-l-2 border-secondary/30 ml-2 sm:ml-6 pl-4 sm:pl-8 space-y-8 sm:space-y-10">
        {educationData.map((edu, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot Node */}
            <div className="absolute top-3 left-0 -translate-x-[calc(50%+1px)] w-8 h-8 sm:w-10 sm:h-10 bg-surface dark:bg-surface-dark border-3 sm:border-4 border-secondary rounded-full flex items-center justify-center text-secondary shadow-md shadow-secondary/20 z-10">
              {renderIcon(edu.icon)}
            </div>
            
            {/* Education Card */}
            <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                  <Calendar size={12} />
                  {edu.timeline}
                </span>

                <span className="text-xs font-medium text-text-muted flex items-center gap-1">
                  <MapPin size={12} />
                  {edu.school || edu.institution}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-text group-hover:text-secondary transition-colors">
                {edu.degree}
              </h2>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed mt-3 whitespace-pre-wrap">
                {edu.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
