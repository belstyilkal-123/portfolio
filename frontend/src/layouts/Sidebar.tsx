import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, User, Code, Briefcase, GraduationCap, 
  Award, Trophy, Clock, FileText, Image, File, Wrench, 
  BarChart, Download, Mail, Settings, 
  LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { GithubIcon } from '../components/icons';
import { useUIStore } from '../stores/useUIStore';

import { useSettingsStore } from '../stores/useSettingsStore';

const menuGroups = [
  {
    label: 'Main',
    items: [
      { path: '/', icon: Home, label: 'Home' },
      { path: '/about', icon: User, label: 'About' },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      { path: '/skills', icon: Code, label: 'Skills' },
      { path: '/projects', icon: Briefcase, label: 'Projects' },
      { path: '/experience', icon: Clock, label: 'Experience' },
      { path: '/education', icon: GraduationCap, label: 'Education' },
    ],
  },
  {
    label: 'Achievements',
    items: [
      { path: '/certificates', icon: Award, label: 'Certificates' },
      { path: '/achievements', icon: Trophy, label: 'Achievements' },
      { path: '/timeline', icon: Clock, label: 'Timeline' },
    ],
  },
  {
    label: 'Content',
    items: [
      { path: '/blog', icon: FileText, label: 'Blog' },
      { path: '/gallery', icon: Image, label: 'Gallery' },
      { path: '/resume', icon: File, label: 'Resume' },
    ],
  },
  {
    label: 'Extras',
    items: [
      { path: '/services', icon: Wrench, label: 'Services' },
    ],
  },
  {
    label: 'Stats',
    items: [
      { path: '/github', icon: GithubIcon, label: 'GitHub Activity' },
      { path: '/statistics', icon: BarChart, label: 'Statistics' },
      { path: '/downloads', icon: Download, label: 'Downloads' },
    ],
  },
  {
    label: 'Connect',
    items: [
      { path: '/contact', icon: Mail, label: 'Contact' },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { isSectionHidden } = useSettingsStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 256 : 72 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-40 h-screen bg-[#0F172A] border-r border-slate-800 flex flex-col text-[#CBD5E1]"
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800 flex-shrink-0">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate"
            >
              Portfolio
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${!isSidebarOpen ? 'mx-auto' : ''}`}
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-thin">
        {menuGroups.map((group, groupIdx) => {
          const visibleItems = group.items.filter(item => !isSectionHidden(item.label));
          if (visibleItems.length === 0) return null;
          
          return (
          <div key={group.label}>
            {/* Group label — only shown when sidebar is open */}
            <AnimatePresence>
              {isSidebarOpen ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="px-4 pt-4 pb-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted/60 select-none"
                >
                  {group.label}
                </motion.p>
              ) : groupIdx !== 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mx-3 my-2 h-px bg-slate-800"
                />
              ) : null}
            </AnimatePresence>

            {/* Nav Items */}
            <ul className="space-y-1 px-3">
              {visibleItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2.5 rounded-xl transition-all group relative ${
                        isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-[#CBD5E1]/70 hover:bg-white/5 hover:text-white'
                      }`
                    }
                    title={!isSidebarOpen ? item.label : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active indicator bar */}
                        {isActive && (
                          <motion.span
                            layoutId="sidebar-active"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-primary"
                          />
                        )}
                        <item.icon
                          size={19}
                          className={`flex-shrink-0 transition-colors ${
                            isSidebarOpen ? 'mr-3' : 'mx-auto'
                          } ${isActive ? 'text-primary' : ''}`}
                        />
                        <AnimatePresence>
                          {isSidebarOpen && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.15 }}
                              className="truncate text-sm"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
              </ul>
          </div>
        );
      })}
      </div>

      {/* Bottom: Settings + Logout */}
      <div className="border-t border-slate-800 p-3 flex-shrink-0 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center px-3 py-2.5 rounded-xl transition-all ${
              isActive
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-[#CBD5E1]/70 hover:bg-white/5 hover:text-white'
            }`
          }
          title={!isSidebarOpen ? 'Settings' : undefined}
        >
          <Settings size={19} className={`flex-shrink-0 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="truncate text-sm"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>

        <button
          className={`flex items-center w-full px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors`}
          title={!isSidebarOpen ? 'Logout' : undefined}
        >
          <LogOut size={19} className={`flex-shrink-0 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="truncate text-sm"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};
