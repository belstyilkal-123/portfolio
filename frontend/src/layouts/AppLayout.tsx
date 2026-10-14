import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Home, Code2, Sparkles, Send, Search, ArrowUp } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CustomCursor } from '../components/ui/CustomCursor';
import { SearchModal } from '../components/ui/SearchModal';
import { useUIStore } from '../stores/useUIStore';
import { usePopSound } from '../hooks/usePopSound';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const playPop = usePopSound();
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToTop = () => {
    playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mobileDockItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: Code2 },
    { name: 'Skills', path: '/skills', icon: Sparkles },
    { name: 'Contact', path: '/contact', icon: Send },
  ];

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col selection:bg-primary/30 font-sans cursor-default relative overflow-x-hidden">
      <CustomCursor />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      
      {/* Top Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-[90]" 
        style={{ scaleX }} 
      />
      
      <Header />
      
      {/* Main Content Area */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-28 md:pb-12"
      >
        {children}
      </motion.main>
      
      <Footer />

      {/* Floating Mobile Dock (Visible on Mobile Screens only < 768px) */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 md:hidden w-[calc(100%-2rem)] max-w-sm">
        <nav className="glass-panel rounded-full px-3 py-2 flex items-center justify-around shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-2xl">
          {mobileDockItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={playPop}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${
                    isActive 
                      ? 'text-primary font-bold scale-110' 
                      : 'text-text-muted hover:text-text'
                  }`
                }
                title={item.name}
              >
                <Icon size={20} />
                <span className="text-[10px] mt-0.5 font-medium">{item.name}</span>
              </NavLink>
            );
          })}

          {/* Quick Search in Mobile Dock */}
          <button
            type="button"
            onClick={() => { playPop(); setSearchOpen(true); }}
            className="flex flex-col items-center justify-center p-2 rounded-2xl text-text-muted hover:text-text transition-all"
            title="Search"
            aria-label="Search"
          >
            <Search size={20} />
            <span className="text-[10px] mt-0.5 font-medium">Search</span>
          </button>
        </nav>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-8 right-4 sm:right-8 z-40 p-3 rounded-full bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-text-muted hover:text-primary hover:border-primary shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
