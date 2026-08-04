import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Activity, Code2, ExternalLink, GitPullRequest, Circle } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import { useGitHubOverview } from '../hooks/useGitHubOverview';

export const GitHubActivity: React.FC = () => {
  const { data, isLoading } = useGitHubOverview();

  const activityData = [
    { day: 'Mon', commits: 4 },
    { day: 'Tue', commits: 7 },
    { day: 'Wed', commits: 2 },
    { day: 'Thu', commits: 9 },
    { day: 'Fri', commits: 5 },
    { day: 'Sat', commits: 11 },
    { day: 'Sun', commits: 3 },
  ];

  const maxCommits = Math.max(...activityData.map((d) => d.commits));

  const stats = [
    { label: 'Public Repos', value: isLoading ? 'Loading...' : `${data?.totalPublicRepos ?? 0}`, icon: Code2 },
    { label: 'Total Stars', value: isLoading ? 'Loading...' : `${data?.totalStars ?? 0}`, icon: Star },
    { label: 'Total Forks', value: isLoading ? 'Loading...' : `${data?.totalForks ?? 0}`, icon: GitFork },
    { label: 'Top Repos', value: isLoading ? 'Loading...' : `${data?.topRepos.length ?? 0}`, icon: GitPullRequest },
  ];

  return (
    <div className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-300 border border-zinc-700 mb-6 text-sm font-medium">
          <GithubIcon size={16} />
          Open Source
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-zinc-300 via-white to-zinc-400 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
            GitHub
          </span>{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Overview
          </span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto text-lg mb-6">
          Live GitHub repository stats powered by the GitHub API.
        </p>
        <a
          href="https://github.com/belstyilkal-123"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white rounded-xl transition-all font-medium shadow-lg hover:-translate-y-0.5"
        >
          <GithubIcon size={18} />
          View GitHub
          <ExternalLink size={14} />
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-2xl text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
              <stat.icon size={22} />
            </div>
            <p className="text-3xl font-extrabold text-text">{stat.value}</p>
            <p className="text-sm text-text-muted mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel rounded-3xl p-8 mb-12 border border-border dark:border-zinc-800/80"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10 text-primary"><Activity size={20} /></div>
          <div>
            <h2 className="text-xl font-bold">Commit Activity</h2>
            <p className="text-sm text-text-muted">This chart is a placeholder while repo stats load.</p>
          </div>
        </div>
        <div className="flex items-end gap-4 h-32">
          {activityData.map((d, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.commits / maxCommits) * 100}%` }}
                transition={{ delay: 0.3 + idx * 0.05, duration: 0.6, ease: 'easeOut' }}
                className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg min-h-[4px]"
                style={{ height: `${(d.commits / maxCommits) * 100}%` }}
              />
              <span className="text-xs text-text-muted">{d.day}</span>
              <span className="text-xs font-bold text-text">{d.commits}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mb-6 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary"><Code2 size={20} /></div>
        <h2 className="text-xl font-bold">Top GitHub Repositories</h2>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {isLoading ? (
          <div className="col-span-full glass-panel rounded-3xl p-12 text-center text-text-muted">
            Loading GitHub repositories...
          </div>
        ) : data?.topRepos.length ? (
          data.topRepos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-panel rounded-2xl p-6 border border-border dark:border-zinc-800/80 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GithubIcon size={18} className="text-text-muted" />
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-text group-hover:text-primary transition-colors truncate"
                  >
                    {repo.name}
                  </a>
                </div>
                <ExternalLink size={14} className="text-text-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-text-muted leading-relaxed flex-1 mb-5">
                {repo.description || 'No repository description available.'}
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-text-muted border-t border-border dark:border-border-dark pt-4 mt-auto">
                <span className="flex items-center gap-1.5">
                  <Circle size={10} style={{ color: '#3b82f6', fill: '#3b82f6' }} />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star size={14} />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1.5">
                  <GitFork size={14} />
                  {repo.forks}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full glass-panel rounded-3xl p-12 text-center text-text-muted">
            No GitHub repository data available.
          </div>
        )}
      </motion.div>
    </div>
  );
};
