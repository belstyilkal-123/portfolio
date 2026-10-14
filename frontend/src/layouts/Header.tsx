import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Sun, Moon, Monitor, Download, X, ChevronDown, 
  Volume2, VolumeX, Search, Home, User, Briefcase, 
  Code2, GraduationCap, Award, FileText, Send, 
  Clock, BookOpen, Layers, Sparkles
} from 'lucide-react';
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
  const role = getSetting('role', 'Software Developer');
  const avatarUrl = getSetting('avatarUrl', '/profile.jpg');

  // Close menus when route changes
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside & Escape key
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

  const primaryNavLinks = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Blog', path: '/blog' },
  ];

  const moreDropdownCategories = [
    {
      label: 'Career & Studies',
      items: [
        { name: 'Education', path: '/education', icon: GraduationCap },
        { name: 'Certificates', path: '/certificates', icon: Award },
        { name: 'Interactive Resume', path: '/resume', icon: FileText },
        { name: 'Milestones & Wins', path: '/achievements', icon: Sparkles },
      ]
    },
    {
      label: 'Showcase & Tools',
      items: [
        { name: 'Services & Rates', path: '/services', icon: Layers },
        { name: 'Career Timeline', path: '/timeline', icon: Clock },
        { name: 'Downloads & CV', path: '/downloads', icon: Download },
        { name: 'Get In Touch', path: '/contact', icon: Send },
      ]
    }
  ];

  const allMorePaths = moreDropdownCategories.flatMap(c => c.items.map(i => i.path));
  const isMoreActive = allMorePaths.includes(location.pathname);

  // Grouped links for the mobile drawer
  const mobileNavGroups = [
    {
      title: 'Main Navigation',
      links: [
        { name: 'Home', path: '/', icon: Home },
        { name: 'About', path: '/about', icon: User },
        { name: 'Projects', path: '/projects', icon: Code2 },
        { name: 'Skills', path: '/skills', icon: Sparkles },
        { name: 'Experience', path: '/experience', icon: Briefcase },
        { name: 'Blog', path: '/blog', icon: BookOpen },
      ]
    },
    {
      title: 'Career & Credentials',
      links: [
        { name: 'Resume', path: '/resume', icon: FileText },
        { name: 'Education', path: '/education', icon: GraduationCap },
        { name: 'Certificates', path: '/certificates', icon: Award },
        { name: 'Achievements', path: '/achievements', icon: Sparkles },
      ]
    },
    {
      title: 'Services & Connect',
      links: [
        { name: 'Services', path: '/services', icon: Layers },
        { name: 'Timeline', path: '/timeline', icon: Clock },
        { name: 'Downloads', path: '/downloads', icon: Download },
        { name: 'Contact Me', path: '/contact', icon: Send },
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-16 sm:h-20 bg-surface/85 dark:bg-surface-dark/85 backdrop-blur-xl border-b border-border/80 dark:border-border-dark/80 transition-colors">
      <div className="w-full max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group shrink-0" 
          onClick={playPop}
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary transition-all">
            <img 
              src={avatarUrl} 
              alt={name} 
              className="w-full h-full object-cover object-top" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              {name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-text-muted flex items-center gap-1.5 -mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block"></span>
              {role}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (>= 1024px) */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
          {primaryNavLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => playPop()}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full transition-all duration-200 text-sm ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm shadow-primary/5' 
                    : 'text-text-muted hover:text-text hover:bg-zinc-100 dark:hover:bg-zinc-800/80'
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
              className={`flex items-center gap-1 px-3.5 py-2 rounded-full transition-all text-sm ${
                isMoreActive || dropdownOpen
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-text-muted hover:text-text hover:bg-zinc-100 dark:hover:bg-zinc-800/80'
              }`}
            >
              <span>Explore</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <div className="absolute top-full right-0 pt-2 w-72 z-50">
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl overflow-hidden p-3 backdrop-blur-2xl"
                  >
                    {moreDropdownCategories.map((cat, idx) => (
                      <div key={idx} className={idx > 0 ? 'mt-2 pt-2 border-t border-border/60 dark:border-border-dark/60' : ''}>
                        <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-muted/70">
                          {cat.label}
                        </p>
                        <div className="space-y-0.5 mt-1">
                          {cat.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => { playPop(); setDropdownOpen(false); }}
                                className={({ isActive }) =>
                                  `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                                    isActive 
                                      ? 'text-primary bg-primary/10 font-semibold' 
                                      : 'text-text-muted hover:text-text hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                  }`
                                }
                              >
                                <Icon size={16} className="text-text-muted shrink-0" />
                                <span>{item.name}</span>
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Tablet Navigation (768px - 1023px) */}
        <nav className="hidden md:flex lg:hidden items-center gap-1 font-medium text-sm">
          <NavLink
            to="/about"
            className={({ isActive }) => `px-3 py-1.5 rounded-full ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-text-muted hover:text-text'}`}
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => `px-3 py-1.5 rounded-full ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-text-muted hover:text-text'}`}
          >
            Projects
          </NavLink>
          <NavLink
            to="/experience"
            className={({ isActive }) => `px-3 py-1.5 rounded-full ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-text-muted hover:text-text'}`}
          >
            Experience
          </NavLink>
          <NavLink
            to="/skills"
            className={({ isActive }) => `px-3 py-1.5 rounded-full ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-text-muted hover:text-text'}`}
          >
            Skills
          </NavLink>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Search Button */}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { playPop(); setSearchOpen(true); }}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-text-muted hover:text-text transition-colors text-sm"
            aria-label="Search portfolio"
            title="Search portfolio (Ctrl+K)"
          >
            <Search size={16} />
            <span className="hidden sm:inline text-xs font-medium">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[10px] font-sans text-text-muted">
              ⌘K
            </kbd>
          </motion.button>

          {/* Sound Toggle (Tablet & Desktop) */}
          <motion.button 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => { toggleSound(); if (!soundEnabled) playPop(); }}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-text-muted transition-colors hidden sm:flex items-center justify-center"
            title={soundEnabled ? "Mute interactive sounds" : "Enable interactive sounds"}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={18} className="text-primary" /> : <VolumeX size={18} />}
          </motion.button>

          {/* Theme Toggle */}
          <motion.button 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={cycleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-text-muted transition-colors flex items-center justify-center relative overflow-hidden"
            title={`Current theme: ${theme}. Click to switch.`}
            aria-label="Switch color theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -12, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 12, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? (
                  <Sun size={18} className="text-amber-500" />
                ) : theme === 'dark' ? (
                  <Moon size={18} className="text-secondary" />
                ) : (
                  <Monitor size={18} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Resume CTA (Desktop & Tablets) */}
          <motion.a 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="/resume.pdf" 
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-full transition-all font-medium text-xs sm:text-sm shadow-sm shadow-primary/20"
          >
            <Download size={14} />
            <span>Resume</span>
          </motion.a>

          {/* Mobile Menu Button */}
          <button 
            type="button"
            onClick={() => { playPop(); setMobileMenuOpen(true); }} 
            className="lg:hidden p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-text hover:text-primary transition-colors focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[120] lg:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { playPop(); setMobileMenuOpen(false); }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-surface dark:bg-surface-dark border-l border-border dark:border-border-dark flex flex-col shadow-2xl p-5 sm:p-6 overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border dark:border-border-dark">
                <div className="flex items-center gap-3">
                  <img 
                    src={avatarUrl} 
                    alt={name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary" 
                  />
                  <div>
                    <p className="font-bold text-sm text-text leading-tight">{name}</p>
                    <p className="text-xs text-text-muted">{role}</p>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => { playPop(); setMobileMenuOpen(false); }}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status Badge */}
              <div className="mt-4 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-2 text-xs font-medium text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0"></span>
                <span>Open for full-stack & IoT opportunities</span>
              </div>
              
              {/* Scrollable Navigation Groups */}
              <div className="flex-1 overflow-y-auto py-4 space-y-5 -mx-2 px-2">
                {mobileNavGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted/60 px-3 pb-1">
                      {group.title}
                    </p>
                    {group.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <NavLink
                          key={link.name}
                          to={link.path}
                          onClick={() => { playPop(); setMobileMenuOpen(false); }}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              isActive 
                                ? 'bg-primary/15 text-primary font-bold shadow-sm' 
                                : 'text-text-muted hover:bg-zinc-100 dark:hover:bg-zinc-800/70 hover:text-text'
                            }`
                          }
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={18} className="shrink-0" />
                            <span>{link.name}</span>
                          </div>
                          <span className="text-xs opacity-50">›</span>
                        </NavLink>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Mobile Drawer Bottom Actions */}
              <div className="pt-4 border-t border-border dark:border-border-dark flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { playPop(); setMobileMenuOpen(false); setSearchOpen(true); }}
                    className="flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-text text-xs font-medium transition-colors"
                  >
                    <Search size={16} />
                    <span>Search</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { toggleSound(); playPop(); }}
                    className="flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-text-muted hover:text-text text-xs font-medium transition-colors"
                  >
                    {soundEnabled ? <Volume2 size={16} className="text-primary" /> : <VolumeX size={16} />}
                    <span>{soundEnabled ? 'Mute' : 'Sound'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={cycleTheme}
                    className="flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-text-muted hover:text-text text-xs font-medium transition-colors"
                  >
                    {theme === 'light' ? <Sun size={16} className="text-amber-500" /> : theme === 'dark' ? <Moon size={16} className="text-secondary" /> : <Monitor size={16} />}
                    <span>Theme</span>
                  </button>
                </div>

                <a
                  href="/resume.pdf"
                  download
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-sm shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
                >
                  <Download size={16} /> Download Full CV (PDF)
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
