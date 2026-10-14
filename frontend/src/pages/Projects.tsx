import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../hooks/useProjects';
import { Loader2, Search, Filter, Code2 } from 'lucide-react';
import { ProjectCard } from '../components/ui/ProjectCard';
import { usePopSound } from '../hooks/usePopSound';

export const Projects: React.FC = () => {
  const { data: projectsData = [], isPending: isLoading } = useProjects();
  const playPop = usePopSound();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Full-Stack', 'IoT & Hardware', 'Frontend', 'Backend'];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const techString = (project.tech || []).join(' ').toLowerCase();
      const titleString = (project.title || '').toLowerCase();
      const descString = (project.description || '').toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch = !q || titleString.includes(q) || descString.includes(q) || techString.includes(q);

      if (!matchesSearch) return false;

      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Full-Stack') {
        return techString.includes('full') || (techString.includes('react') && techString.includes('node')) || techString.includes('mongo') || techString.includes('express');
      }
      if (selectedCategory === 'IoT & Hardware') {
        return techString.includes('iot') || techString.includes('esp') || techString.includes('c++') || techString.includes('mqtt') || techString.includes('arduino') || descString.includes('iot') || descString.includes('sensor');
      }
      if (selectedCategory === 'Frontend') {
        return techString.includes('react') || techString.includes('tailwind') || techString.includes('next') || techString.includes('vue') || techString.includes('css');
      }
      if (selectedCategory === 'Backend') {
        return techString.includes('node') || techString.includes('express') || techString.includes('mongo') || techString.includes('sql') || techString.includes('api');
      }

      return true;
    });
  }, [projectsData, selectedCategory, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh] gap-4">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
        <p className="text-sm text-text-muted">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 sm:mb-12 text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <Code2 size={16} />
          <span>Curated Engineering Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Featured{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 max-w-2xl mx-auto leading-relaxed">
          Production systems, web platforms, and IoT hardware prototypes engineered for reliability, usability, and scale.
        </p>
      </motion.div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { playPop(); setSelectedCategory(cat); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or stack..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-border dark:border-border-dark text-xs sm:text-sm text-text placeholder-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-border dark:border-border-dark text-center text-text-muted max-w-lg mx-auto">
          <Filter size={36} className="mx-auto mb-3 opacity-40 text-primary" />
          <p className="text-lg font-bold text-text mb-1">No matching projects</p>
          <p className="text-xs sm:text-sm">Try clearing your search query or selecting a different category filter.</p>
          <button
            type="button"
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const codeUrl = project.githubUrl && project.githubUrl !== '#' ? project.githubUrl : undefined;
              const liveUrl = project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : undefined;

              return (
                <ProjectCard
                  key={project._id || idx}
                  index={idx}
                  title={project.title}
                  description={project.description}
                  tags={project.tech ?? []}
                  githubUrl={codeUrl}
                  liveUrl={liveUrl}
                  imageUrl={project.imageUrl}
                />
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
