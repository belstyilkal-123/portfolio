import React, { useState } from 'react';
import { Menu, Sun, Moon, Monitor, Download, X, ChevronDown, Volume2, VolumeX, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import { useUIStore } from '../stores/useUIStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import { usePopSound } from '../hooks/usePopSound';

export const Header: React.FC = () => {
  const { theme, setTheme, soundEnabled, toggleSound, setSearchOpen } = useUIStore();
  const { getSetting } = useSettingsStore();
  const playPop = usePopSound();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const name = getSetting('name', 'Belstie Yilkal');

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
    { name: 'Education', path: '/education' },
    { name: 'Skills', path: '/skills' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center h-20 px-6 bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-xl border-b border-border dark:border-border-dark">
      <div className="w-full max-w-5xl flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform" onClick={playPop}>
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
          <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
            <button 
              onMouseEnter={() => setDropdownOpen(true)}
              onClick={() => { playPop(); setDropdownOpen(!dropdownOpen); }}
              className="flex items-center gap-1 px-4 py-2 rounded-full text-text-muted hover:text-text hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              More <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-xl overflow-hidden py-2"
                >
                  {moreLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => { playPop(); setDropdownOpen(false); }}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition-colors ${
                          isActive 
                            ? 'text-primary bg-primary/5' 
                            : 'text-text-muted hover:text-text hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </motion.div>
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
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? <Sun size={20} className="text-accent" /> : theme === 'dark' ? <Moon size={20} className="text-secondary" /> : <Monitor size={20} />}
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
            onClick={() => setMobileMenuOpen(true)} 
            className="md:hidden p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-text-muted"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-surface dark:bg-surface-dark flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-extrabold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Menu
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-4 overflow-y-auto">
              {[...navLinks, ...moreLinks].map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => { playPop(); setMobileMenuOpen(false); }}
                  className={({ isActive }) =>
                    `text-2xl font-bold p-4 rounded-2xl transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-text-muted hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-text'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
