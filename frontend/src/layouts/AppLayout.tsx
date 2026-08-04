import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { useUIStore } from '../stores/useUIStore';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSidebarOpen } = useUIStore();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg text-text flex selection:bg-primary/30">
      <Sidebar />
      <div 
        className="flex-1 flex flex-col transition-all duration-300 min-h-screen relative"
        style={{ marginLeft: isSidebarOpen ? '256px' : '80px' }}
      >
        <Header />
        <AnimatePresence mode="wait">
          <motion.main 
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
};
