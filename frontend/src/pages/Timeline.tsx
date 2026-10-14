import React from 'react';
import { motion } from 'framer-motion';
import { useTimelines } from '../hooks/useContent';
import * as Icons from 'lucide-react';
import { Clock } from 'lucide-react';

const defaultTimelines = [
  {
    _id: '1',
    year: '2024 - Present',
    title: 'Full-Stack Software Engineering',
    company: 'Web Platforms & Real-World Apps',
    description: 'Deepened full-stack engineering expertise using React 19, TypeScript, Node.js, and MongoDB. Built responsive applications with robust authentication and state management.',
    icon: 'Code2',
    color: 'bg-primary'
  },
  {
    _id: '2',
    year: '2023 - 2024',
    title: 'IoT & Hardware Interfacing',
    company: 'Embedded Systems Innovation',
    description: 'Explored microcontroller architectures, ESP32 firmware programming in C++, MQTT telemetry communication, and hardware prototyping.',
    icon: 'Cpu',
    color: 'bg-secondary'
  },
  {
    _id: '3',
    year: '2022',
    title: 'Commenced BSc in Information Technology',
    company: 'Bahir Dar University',
    description: 'Began academic higher education, excelling in computer science foundations, algorithms, data structures, and computer networking.',
    icon: 'GraduationCap',
    color: 'bg-accent'
  }
];

export const Timeline: React.FC = () => {
  const { data: timelineEvents = [], isLoading } = useTimelines();

  const activeEvents = timelineEvents.length > 0 ? timelineEvents : defaultTimelines;

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 max-w-3xl mx-auto space-y-8 sm:space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <Clock size={16} />
          <span>Milestones Over Time</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          My{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Journey
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Chronological timeline of my academic, engineering, and personal milestones in technology.
        </p>
      </motion.div>

      {/* Responsive Vertical Timeline */}
      <div className="relative border-l-2 border-border dark:border-border-dark ml-2 sm:ml-6 pl-4 sm:pl-8 space-y-8 sm:space-y-10 pb-4">
        {activeEvents.map((event: any, idx: number) => {
          const IconComponent = (Icons as any)[event.icon] || Icons.Briefcase;
          const bgClass = event.color?.startsWith('bg-') ? event.color : 'bg-primary';

          return (
            <motion.div 
              key={event._id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className={`absolute top-2 left-0 -translate-x-[calc(50%+1px)] w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-surface dark:border-surface-dark flex items-center justify-center text-white ${bgClass} shadow-md shadow-primary/20 z-10`}>
                <IconComponent size={13} />
              </div>

              {/* Card */}
              <div className="glass-panel p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border border-border dark:border-border-dark hover:shadow-xl transition-all duration-300">
                <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-text font-bold text-xs rounded-full mb-2.5">
                  {event.year}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-text mb-1">
                  {event.title}
                </h3>

                <h4 className="text-xs sm:text-sm text-primary font-semibold mb-3">
                  {event.company}
                </h4>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
