import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Star } from 'lucide-react';

export const Timeline: React.FC = () => {
  const timelineEvents = [
    {
      year: '2024',
      title: 'Networking Intern',
      company: 'Local IT Firm, Bahir Dar',
      description: 'Gained hands-on experience in configuring Cisco routers, switches, and setting up secure local area networks using Cisco Packet Tracer.',
      icon: Briefcase,
      color: 'bg-emerald-500'
    },
    {
      year: '2023',
      title: 'Built Smart Irrigation System',
      company: 'IoT Academic Project',
      description: 'Designed and programmed an ESP32-based smart irrigation management system with real-time sensor monitoring and automatic water flow control.',
      icon: Award,
      color: 'bg-blue-500'
    },
    {
      year: '2022',
      title: 'Started Information Technology Degree',
      company: 'Bahir Dar University',
      description: 'Enrolled in the IT program, beginning my journey into software development, databases, and networking.',
      icon: GraduationCap,
      color: 'bg-primary'
    },
    {
      year: '2021',
      title: 'First Coding Experience',
      company: 'Self-Taught',
      description: 'Wrote my first lines of HTML, CSS, and basic JavaScript, sparking a lifelong passion for building on the web.',
      icon: Star,
      color: 'bg-purple-500'
    }
  ];

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
          {timelineEvents.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-4 border-bg flex items-center justify-center text-white ${event.color} shadow-lg shadow-${event.color}/20`}>
                <event.icon size={14} />
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
          ))}
        </div>
      </motion.div>
    </div>
  );
};
