import React, { useState, useEffect, useRef } from 'react';
import { Menu, Sun, Moon, Monitor, Download, X, ChevronDown, Volume2, VolumeX, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../stores/useUIStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import { usePopSound } from '../hooks/usePopSound';

export const Header: React.FC = () => {
  const { theme, setTheme, soundEnabled, toggleSound, setSearchOpen } = useUIStore();
  const { getSetting } = useSettingsStore();
  const playPop = usePopSound();
  const location = useLocation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const name = getSetting('name', 'Belstie Yilkal');

  // Close menus when route changes
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown & escape key support
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const cycleTheme = () => {
    playPop();
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Blog', path: '/blog' },
  ];

  const moreLinks = [
    { name: 'Skills', path: '/skills' },
    { name: 'Education', path: '/education' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Services', path: '/services' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact', path: '/contact' },
  ];

  const mobileNavLinks = [
    { name: 'Home', path: '/' },
    ...navLinks,
    ...moreLinks,
  ];

  const isMoreActive = moreLinks.some((l) => location.pathname === l.path);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center h-20 px-4 sm:px-6 bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-xl border-b border-border dark:border-border-dark">
      <div className="w-full max-w-5xl flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform" 
          onClick={playPop}
        >
          {name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => playPop()}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-text-muted hover:text-text hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          {/* More Dropdown */}
          <div 
            ref={dropdownRef} 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              type="button"
              onClick={() => { playPop(); setDropdownOpen((prev) => !prev); }}
              aria-expanded={dropdownOpen}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors ${
                isMoreActive || dropdownOpen
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:text-text hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <span>More</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <div className="absolute top-full right-0 pt-2 w-52 z-50">
                  <motion.div 
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl overflow-hidden py-1.5 backdrop-blur-xl"
                  >
                    {moreLinks.map((link) => (
                      <NavLink
                        key={link.name}
                        to={link.path}
                        onClick={() => { playPop(); setDropdownOpen(false); }}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm transition-colors ${
                            isActive 
                              ? 'text-primary bg-primary/10 font-semibold' 
                              : 'text-text-muted hover:text-text hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { playPop(); setSearchOpen(true); }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text transition-colors text-sm"
          >
            <Search size={16} />
            <span>Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-900 text-[10px] font-sans ml-2">
              ⌘K
            </kbd>
          </motion.button>

          <div className="w-px h-6 bg-border dark:bg-border-dark hidden md:block mx-1"></div>

          <motion.button 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            onClick={() => { toggleSound(); if (!soundEnabled) playPop(); }}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center text-text-muted hidden sm:flex"
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {soundEnabled ? <Volume2 size={20} className="text-primary" /> : <VolumeX size={20} />}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.8, rotate: -15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={cycleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center relative overflow-hidden text-text-muted"
            title={`Current theme: ${theme}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -16, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 16, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? <Sun size={20} className="text-amber-500" /> : theme === 'dark' ? <Moon size={20} className="text-secondary" /> : <Monitor size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf" 
            download
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full transition-colors font-medium text-sm shadow-sm shadow-primary/20"
          >
            <Download size={16} />
            Resume
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button 
            type="button"
            onClick={() => { playPop(); setMobileMenuOpen(true); }} 
            className="md:hidden p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-text-muted"
            aria-label="Open mobile menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] bg-surface/95 dark:bg-surface-dark/95 backdrop-blur-2xl flex flex-col p-6"
          >
            {/* Mobile Header Bar */}
            <div className="flex justify-between items-center pb-4 border-b border-border dark:border-border-dark mb-4">
              <Link 
                to="/" 
                onClick={() => { playPop(); setMobileMenuOpen(false); }}
                className="font-extrabold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                {name}
              </Link>
              <button 
                type="button"
                onClick={() => { playPop(); setMobileMenuOpen(false); }}
                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            
            {/* Scrollable Navigation List */}
            <nav className="flex-1 min-h-0 overflow-y-auto py-2 space-y-1">
              {mobileNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => { playPop(); setMobileMenuOpen(false); }}
                  className={({ isActive }) =>
                    `flex items-center justify-between text-lg font-semibold px-4 py-3 rounded-2xl transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-text-muted hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-text'
                    }`
                  }
                >
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Bottom Quick Actions */}
            <div className="pt-4 border-t border-border dark:border-border-dark flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => { playPop(); setMobileMenuOpen(false); setSearchOpen(true); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-text text-sm font-medium"
                >
                  <Search size={16} /> Search
                </button>

                <button
                  type="button"
                  onClick={() => { toggleSound(); playPop(); }}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text"
                  title="Toggle sound"
                >
                  {soundEnabled ? <Volume2 size={18} className="text-primary" /> : <VolumeX size={18} />}
                </button>

                <button
                  type="button"
                  onClick={cycleTheme}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text"
                  title="Toggle theme"
                >
                  {theme === 'light' ? <Sun size={18} className="text-amber-500" /> : theme === 'dark' ? <Moon size={18} className="text-secondary" /> : <Monitor size={18} />}
                </button>
              </div>

              <a
                href="/resume.pdf"
                download
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-sm shadow-md shadow-primary/20 transition-colors"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
