import React from 'react';
import { Menu, Sun, Moon, Monitor, Search, Bell, Download } from 'lucide-react';
import { useUIStore } from '../stores/useUIStore';
import { personalInfo } from '../data/portfolioData';


export const Header: React.FC = () => {
  const { toggleSidebar, theme, setTheme } = useUIStore();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-surface border-b border-border">
      <div className="flex items-center gap-4">
        {/* Mobile sidebar toggle */}
        <button 
          onClick={() => toggleSidebar()} 
          className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>
        {/* Brand name on mobile */}
        <span className="md:hidden font-bold text-base bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {personalInfo.name.split(' ')[0]}
        </span>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 rounded-full text-sm text-text-muted">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none focus:ring-0 w-48"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={cycleTheme}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title={`Current theme: ${theme}`}
        >
          {theme === 'light' ? <Sun size={20} /> : theme === 'dark' ? <Moon size={20} /> : <Monitor size={20} />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg"></span>
        </button>

        <a 
          href="/resume.pdf" 
          download
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm shadow-sm shadow-primary/20"
        >
          <Download size={16} />
          Resume
        </a>
      </div>
    </header>
  );
};
