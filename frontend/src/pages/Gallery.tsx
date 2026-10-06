import React from 'react';
import { motion } from 'framer-motion';

import { useGalleries } from '../hooks/useContent';

export const Gallery: React.FC = () => {
  const { data: images = [], isLoading } = useGalleries();

  if (isLoading) {
    return <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="py-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
          Photo Gallery
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          A collection of my workspace, hardware projects, and tech environment.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img, idx) => (
          <motion.div 
            key={img._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="relative group rounded-3xl overflow-hidden break-inside-avoid border border-border dark:border-zinc-800/80"
          >
            <img 
              src={img.src} 
              alt={img.title} 
              className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-6">
                <h3 className="text-white font-bold text-lg">{img.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
