import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Loader2, Briefcase, Calendar, Building2 } from 'lucide-react';
import { apiClient as api } from '../api/client';

const defaultExperiences = [
  {
    role: 'Full-Stack Software Developer Intern',
    company: 'Tech Solutions & Systems',
    timeline: '2024 - Present',
    description: 'Developed modern web applications using React, TypeScript, and Node.js. Integrated REST APIs, designed MongoDB schemas, and participated in agile sprints to ship customer-facing features.',
    icon: 'Briefcase'
  },
  {
    role: 'IoT & Embedded Systems Lead',
    company: 'University Innovation Lab',
    timeline: '2023 - 2024',
    description: 'Prototyped and built connected IoT devices utilizing ESP32 microcontrollers. Programmed sensor data collection in C++ and streamed real-time telemetry through MQTT brokers to web dashboards.',
    icon: 'Cpu'
  },
  {
    role: 'Information Technology Student Developer',
    company: 'Bahir Dar University',
    timeline: '2022 - Present',
    description: 'Engaged in core coursework including Data Structures, Algorithms, Computer Networking, Database Management, and Software Engineering methodologies.',
    icon: 'GraduationCap'
  }
];

export const Experience: React.FC = () => {
  const [experienceData, setExperienceData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/experience');
        if (res.data && res.data.length > 0) {
          setExperienceData(res.data);
        } else {
          setExperienceData(defaultExperiences);
        }
      } catch (error) {
        console.error('Failed to fetch experience', error);
        setExperienceData(defaultExperiences);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName] || LucideIcons.Briefcase;
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
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <Briefcase size={16} />
          <span>Professional Experience</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Career{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Experience
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 max-w-xl mx-auto leading-relaxed">
          My practical engineering journey, project leadership roles, and hands-on developer internships.
        </p>
      </motion.div>

      {/* Responsive Timeline */}
      <div className="relative border-l-2 border-primary/30 ml-2 sm:ml-6 pl-4 sm:pl-8 space-y-8 sm:space-y-10">
        {experienceData.map((exp, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot Node */}
            <div className="absolute top-3 left-0 -translate-x-[calc(50%+1px)] w-8 h-8 sm:w-10 sm:h-10 bg-surface dark:bg-surface-dark border-3 sm:border-4 border-primary rounded-full flex items-center justify-center text-primary shadow-md shadow-primary/20 z-10">
              {renderIcon(exp.icon)}
            </div>
            
            {/* Experience Card */}
            <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <Calendar size={12} />
                  {exp.timeline}
                </span>

                <span className="text-xs font-medium text-text-muted flex items-center gap-1">
                  <Building2 size={12} />
                  {exp.company}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-text group-hover:text-primary transition-colors">
                {exp.role}
              </h2>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed mt-3 whitespace-pre-wrap">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
