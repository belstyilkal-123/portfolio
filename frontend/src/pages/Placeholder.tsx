import React from 'react';
import { motion } from 'framer-motion';

export const Placeholder: React.FC<{ title: string }> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
        {title}
      </h1>
      <p className="text-text-muted max-w-lg">
        This page is currently under construction. Please check back later.
      </p>
    </motion.div>
  );
};
