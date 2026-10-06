import React from 'react';
import { motion } from 'framer-motion';
import { useTimelines } from '../hooks/useContent';
import * as Icons from 'lucide-react';

export const Timeline: React.FC = () => {
  const { data: timelineEvents = [], isLoading } = useTimelines();

  if (isLoading) {
    return <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
            My Journey
          </h1>
          <p className="text-xl text-text-muted">
            A timeline of my academic, professional, and personal milestones in tech.
          </p>
        </div>

        <div className="relative border-l-2 border-border dark:border-border-dark ml-4 md:ml-8 space-y-12 pb-8">
          {timelineEvents.map((event, idx) => {
            const IconComponent = (Icons as any)[event.icon] || Icons.Briefcase;
            return (
            <motion.div 
              key={event._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-4 border-bg flex items-center justify-center text-white ${event.color} shadow-lg shadow-${event.color}/20`}>
                <IconComponent size={14} />
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:shadow-xl transition-all duration-300">
                <span className="inline-block px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-sm font-semibold rounded-full mb-3">
                  {event.year}
                </span>
                <h3 className="text-2xl font-bold mb-1">{event.title}</h3>
                <h4 className="text-primary font-medium mb-4">{event.company}</h4>
                <p className="text-text-muted leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          )})}
        </div>
      </motion.div>
    </div>
  );
};
