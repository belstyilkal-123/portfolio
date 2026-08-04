import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Network } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  const focusAreas = [
    { icon: Code2, title: 'Web Applications', detail: 'Modern, responsive interfaces built with best practices.' },
    { icon: Database, title: 'Backend & Databases', detail: 'Secure APIs and data models designed for scaling.' },
    { icon: Network, title: 'Networking', detail: 'Core network configuration and systems connectivity.' },
    { icon: Cpu, title: 'IoT Solutions', detail: 'Embedded systems with real-time monitoring and automation.' }
  ];

  const strengths = [
    'Full-stack development with React and Node.js',
    'Database design for MongoDB and MySQL',
    'Hands-on experience with IoT and ESP32 development',
    'Clear communication and reliable delivery'
  ];

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-primary font-semibold mb-4">Professional Spotlight</p>
        <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="glass-panel p-10 rounded-[2rem] border border-border dark:border-border-dark"
        >
          <h2 className="text-3xl font-bold mb-6">Building systems with clarity and impact</h2>
          <p className="text-lg text-text-muted leading-relaxed">
            {personalInfo.bio}
          </p>

          <div className="mt-10 space-y-4">
            {strengths.map((strength, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
                <p className="text-text-muted">{strength}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid gap-5"
        >
          {focusAreas.map((area) => (
            <div key={area.title} className="glass p-6 rounded-3xl border border-border dark:border-border-dark shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <area.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
              <p className="text-text-muted leading-relaxed">{area.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
