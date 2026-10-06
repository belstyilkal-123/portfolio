import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sun, Moon, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SEARCHABLE_PAGES = [
  { title: 'Dashboard', path: '/admin/dashboard' },
  { title: 'Profile', path: '/admin/profile' },
  { title: 'About', path: '/admin/about' },
  { title: 'Projects', path: '/admin/projects' },
  { title: 'Skills', path: '/admin/skills' },
  { title: 'Experience', path: '/admin/experience' },
  { title: 'Education', path: '/admin/education' },
  { title: 'Certificates', path: '/admin/certificates' },
  { title: 'Resume', path: '/admin/resume' },
  { title: 'Blog', path: '/admin/blog' },
  { title: 'Messages', path: '/admin/messages' },
  { title: 'Media', path: '/admin/media' },
  { title: 'Analytics', path: '/admin/analytics' },
  { title: 'Notifications', path: '/admin/notifications' },
  { title: 'Settings', path: '/admin/settings' },
];

export const AdminHeader: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPages = SEARCHABLE_PAGES.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPage = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setIsSearchOpen(false);
  };
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
        <div ref={searchRef} className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 rounded-full text-sm text-text-muted relative">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search Admin..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="bg-transparent border-none outline-none focus:ring-0 w-48 text-text"
          />
          
          {isSearchOpen && searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 mt-2 w-full bg-surface border border-border rounded-xl shadow-xl overflow-hidden z-50">
              {filteredPages.length > 0 ? (
                <ul className="max-h-64 overflow-y-auto py-2">
                  {filteredPages.map((page, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleSelectPage(page.path)}
                        className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between group transition-colors text-text"
                      >
                        <span className="font-medium">{page.title}</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-text-muted">
                  No pages found
                </div>
              )}
            </div>
          )}
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
        
        <Link to="/admin/notifications" className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative">
          <Bell size={20} />
          {/* Static red dot indicator */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-surface"></span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm shadow-sm shadow-primary/20 cursor-pointer">
          Admin Profile
        </div>
      </div>
    </header>
  );
};
