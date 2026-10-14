import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, GitBranch, Code, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  index: number;
}

export function ProjectCard({ title, description, tags, githubUrl, liveUrl, index, imageUrl }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      className="glass-panel group relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border border-border dark:border-border-dark flex flex-col h-full"
    >
      {/* Desktop Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10 hidden sm:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              550px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Visual Header / Cover */}
      {imageUrl ? (
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-zinc-900 shrink-0">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3 sm:bottom-4 left-4 right-4 z-20">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
              {title}
            </h3>
          </div>
        </div>
      ) : (
        <div className="relative h-40 sm:h-48 w-full shrink-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 dark:from-zinc-900 dark:via-zinc-800/80 dark:to-zinc-950 p-6 flex flex-col justify-between border-b border-border/60 dark:border-border-dark/60 overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/15 rounded-full blur-2xl group-hover:bg-primary/25 transition-colors"></div>
          <div className="flex items-center justify-between z-10">
            <span className="p-2.5 rounded-xl bg-surface/80 dark:bg-zinc-800/90 text-primary border border-border dark:border-zinc-700 shadow-sm">
              <Code size={20} />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary/80 flex items-center gap-1">
              <Sparkles size={12} /> Project
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text z-10 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
      )}

      {/* Card Body */}
      <div className="flex flex-col justify-between flex-1 p-4 sm:p-6 gap-5 relative z-20">
        <div>
          <p className="text-xs sm:text-sm leading-relaxed text-text-muted line-clamp-3 mb-4">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-zinc-100 dark:bg-zinc-800/90 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-text-muted border border-border dark:border-zinc-700/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 pt-4 border-t border-border/80 dark:border-border-dark/80 mt-auto">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border dark:border-border-dark px-3 py-2 text-xs sm:text-sm font-medium text-text hover:text-primary hover:border-primary/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <GitBranch className="h-4 w-4" />
              <span>Source</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-primary-dark shadow-sm shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          )}
          {!liveUrl && !githubUrl && (
            <span className="text-xs text-text-muted italic py-1">In active development</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
