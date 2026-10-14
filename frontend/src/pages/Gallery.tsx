import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGalleries } from '../hooks/useContent';
import { Image, X } from 'lucide-react';
import { usePopSound } from '../hooks/usePopSound';

const defaultImages = [
  {
    _id: '1',
    src: '/profile.jpg',
    title: 'Developer Profile & Portrait'
  },
  {
    _id: '2',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    title: 'Hardware & IoT Microcontroller Testing'
  },
  {
    _id: '3',
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    title: 'Code Architecture & Full-Stack Development'
  },
  {
    _id: '4',
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    title: 'Development Workspace & Dual Monitors'
  }
];

export const Gallery: React.FC = () => {
  const { data: images = [], isLoading } = useGalleries();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const playPop = usePopSound();

  const activeImages = images.length > 0 ? images : defaultImages;

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 space-y-8 sm:space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <Image size={16} />
          <span>Visual Showcase</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Photo{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Gallery
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Moments from my development workstation, microcontroller lab experiments, and tech events.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {activeImages.map((img: any, idx: number) => (
          <motion.div 
            key={img._id || idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => { playPop(); setSelectedImage(img.src); }}
            className="relative group rounded-2xl sm:rounded-3xl overflow-hidden break-inside-avoid border border-border dark:border-border-dark cursor-pointer shadow-sm hover:shadow-xl transition-all"
          >
            <img 
              src={img.src} 
              alt={img.title} 
              loading="lazy"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 sm:p-5">
                <h3 className="text-white font-bold text-sm sm:text-base">{img.title}</h3>
                <span className="text-[11px] text-zinc-300 mt-1 inline-block">Click to expand</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] z-10 glass-panel rounded-2xl overflow-hidden p-2"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                aria-label="Close image"
              >
                <X size={20} />
              </button>
              <img src={selectedImage} alt="Expanded view" className="w-full h-auto max-h-[85vh] object-contain rounded-xl" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
