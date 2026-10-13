import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { CustomCursor } from '../components/ui/CustomCursor';
import { SearchModal } from '../components/ui/SearchModal';
import { useUIStore } from '../stores/useUIStore';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  // Scroll to top smoothly on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col selection:bg-primary/30 font-sans cursor-default">
      <CustomCursor />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-[90]" 
        style={{ scaleX }} 
      />
      <Header />
      
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-12"
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
};
