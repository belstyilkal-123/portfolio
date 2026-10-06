import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Briefcase, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiClient as api } from '../../api/client';
import { usePopSound } from '../../hooks/usePopSound';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const playPop = usePopSound();

  // Fetch all searchable data when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSearching(true);
      Promise.all([
        api.get('/projects'),
        api.get('/blog?status=published')
      ]).then(([projRes, blogRes]) => {
        setProjects(projRes.data || []);
        setBlogs(blogRes.data || []);
        setIsSearching(false);
      }).catch(err => {
        console.error("Search fetch error", err);
        setIsSearching(false);
      });

      // Focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProjects = projects.filter(p => 
    p.title?.toLowerCase().includes(query.toLowerCase()) || 
    p.description?.toLowerCase().includes(query.toLowerCase()) ||
    p.tech?.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const filteredBlogs = blogs.filter(b => 
    b.title?.toLowerCase().includes(query.toLowerCase()) || 
    b.excerpt?.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const hasResults = filteredProjects.length > 0 || filteredBlogs.length > 0;
  const showResults = query.trim().length > 1;

  const handleNavigate = (path: string) => {
    playPop();
    onClose();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-[210] bg-surface dark:bg-surface-dark rounded-2xl shadow-2xl border border-border dark:border-border-dark overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-4 border-b border-border dark:border-border-dark bg-white/50 dark:bg-black/20">
              <Search className="text-text-muted mr-3" size={20} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, articles, and skills..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-text placeholder-text-muted/60"
              />
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-text-muted transition-colors text-xs font-semibold tracking-widest uppercase flex items-center gap-1"
              >
                Esc <X size={14} />
              </button>
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto p-4 md:p-6 flex-1 min-h-[300px]">
              {!showResults ? (
                <div className="h-full flex flex-col items-center justify-center text-text-muted opacity-60">
                  <Search size={48} className="mb-4 opacity-20" />
                  <p>Type to start searching your portfolio...</p>
                </div>
              ) : isSearching ? (
                <div className="h-full flex flex-col items-center justify-center text-text-muted">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p>Searching...</p>
                </div>
              ) : !hasResults ? (
                <div className="h-full flex flex-col items-center justify-center text-text-muted">
                  <p>No results found for "{query}"</p>
                </div>
              ) : (
                <div className="space-y-8">
                  
                  {filteredProjects.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 px-2 flex items-center gap-2">
                        <Briefcase size={14} /> Projects
                      </h3>
                      <div className="space-y-2">
                        {filteredProjects.map(p => (
                          <button
                            key={p._id}
                            onClick={() => handleNavigate('/projects')}
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left group"
                          >
                            <div>
                              <p className="font-semibold text-text group-hover:text-primary transition-colors">{p.title}</p>
                              <p className="text-sm text-text-muted truncate max-w-md">{p.description}</p>
                            </div>
                            <ChevronRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredBlogs.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 px-2 flex items-center gap-2">
                        <BookOpen size={14} /> Articles
                      </h3>
                      <div className="space-y-2">
                        {filteredBlogs.map(b => (
                          <button
                            key={b._id}
                            onClick={() => handleNavigate(`/blog/${b.slug}`)}
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left group"
                          >
                            <div>
                              <p className="font-semibold text-text group-hover:text-secondary transition-colors">{b.title}</p>
                              <p className="text-sm text-text-muted truncate max-w-md">{b.excerpt}</p>
                            </div>
                            <ChevronRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border dark:border-border-dark bg-zinc-50 dark:bg-zinc-900 flex justify-between items-center text-xs text-text-muted">
              <span className="flex items-center gap-2">
                Use <kbd className="px-1.5 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-sans font-medium">↑</kbd> <kbd className="px-1.5 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-sans font-medium">↓</kbd> to navigate
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-sans font-medium">Enter</kbd> to select
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
