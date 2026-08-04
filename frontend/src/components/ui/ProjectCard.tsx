import { motion } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-panel group relative overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-primary/5"
    >
      {imageUrl ? (
        <div className="relative h-56 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-lg">
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          </div>
        </div>
      ) : (
        <div className="h-56 w-full rounded-t-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800" />
      )}

      <div className="flex flex-col justify-between gap-6 p-6">
        {!imageUrl && (
          <h3 className="mb-2 text-xl font-bold tracking-tight text-text group-hover:text-primary transition-colors">
            {title}
          </h3>
        )}

        <div>
          <p className="mb-4 text-sm leading-relaxed text-text-muted">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:border-primary hover:text-text"
            >
              <GitBranch className="h-4 w-4" />
              <span>Code</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
