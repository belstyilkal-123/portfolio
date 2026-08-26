import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';

export const AdminHeader: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-surface border-b border-border shrink-0">
      <div className="flex items-center gap-4">
        {/* Mobile sidebar toggle */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle navigation"
        >
          <span className="font-bold">Menu</span>
        </button>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 rounded-full text-sm text-text-muted">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search Admin..." 
            className="bg-transparent border-none outline-none focus:ring-0 w-48 text-text"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title={`Toggle Theme`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-surface"></span>
        </button>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm shadow-sm shadow-primary/20 cursor-pointer">
          Admin Profile
        </div>
      </div>
    </header>
  );
};
