import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Home, User, Code, Briefcase, GraduationCap, 
  Award, Trophy, Clock, FileText, Image, File, Wrench, 
  MessageSquare, BarChart, Download, Mail, Settings, 
  ShieldCheck, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { GithubIcon } from '../components/icons';
import { useUIStore } from '../stores/useUIStore';

const menuItems = [
  { path: '/', icon: Home, label: 'Home', group: 'Main' },
  { path: '/about', icon: User, label: 'About', group: 'Main' },
  { path: '/skills', icon: Code, label: 'Skills', group: 'Portfolio' },
  { path: '/projects', icon: Briefcase, label: 'Projects', group: 'Portfolio' },
  { path: '/experience', icon: Clock, label: 'Experience', group: 'Portfolio' },
  { path: '/education', icon: GraduationCap, label: 'Education', group: 'Portfolio' },
  { path: '/certificates', icon: Award, label: 'Certificates', group: 'Achievements' },
  { path: '/achievements', icon: Trophy, label: 'Achievements', group: 'Achievements' },
  { path: '/timeline', icon: Clock, label: 'Timeline', group: 'Achievements' },
  { path: '/blog', icon: FileText, label: 'Blog', group: 'Content' },
  { path: '/gallery', icon: Image, label: 'Gallery', group: 'Content' },
  { path: '/resume', icon: File, label: 'Resume', group: 'Content' },
  { path: '/services', icon: Wrench, label: 'Services', group: 'Extras' },
  { path: '/testimonials', icon: MessageSquare, label: 'Testimonials', group: 'Extras' },
  { path: '/github', icon: GithubIcon, label: 'GitHub Activity', group: 'Stats' },
  { path: '/statistics', icon: BarChart, label: 'Statistics', group: 'Stats' },
  { path: '/downloads', icon: Download, label: 'Downloads', group: 'Stats' },
  { path: '/contact', icon: Mail, label: 'Contact', group: 'Connect' },
  { path: '/settings', icon: Settings, label: 'Settings', group: 'System' },
];

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
      className="fixed left-0 top-0 z-40 h-screen bg-surface dark:bg-surface-dark border-r border-border dark:border-border-dark flex flex-col transition-all duration-300"
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border dark:border-border-dark">
        {isSidebarOpen && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate"
          >
            Portfolio
          </motion.span>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors mx-auto"
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg transition-all group ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-text-muted hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-text dark:hover:text-white'
                  }`
                }
                title={!isSidebarOpen ? item.label : undefined}
              >
                <item.icon size={20} className={`min-w-[20px] ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {isSidebarOpen && (
                  <span className="truncate">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-border dark:border-border-dark">
        <button className="flex items-center w-full px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
          <LogOut size={20} className={`min-w-[20px] ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};
