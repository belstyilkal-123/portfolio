import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Activity, Code2, ExternalLink, GitPullRequest, Circle } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import { useGitHubOverview } from '../hooks/useGitHubOverview';
import { usePopSound } from '../hooks/usePopSound';

const fallbackTopRepos = [
  {
    name: 'portfolio-monorepo',
    description: 'Modern, fully responsive developer portfolio with decoupled backend API, admin control portal, and public showcase.',
    language: 'TypeScript',
    stars: 8,
    forks: 3,
    url: 'https://github.com/belstyilkal-123/portfolio-monorepo'
  },
  {
    name: 'esp32-telemetry-mqtt-node',
    description: 'Embedded C++ firmware connecting ESP32 microcontrollers to Node.js backend streams via MQTT broker.',
    language: 'C++',
    stars: 12,
    forks: 4,
    url: 'https://github.com/belstyilkal-123'
  },
  {
    name: 'fullstack-management-portal',
    description: 'Production MERN web application with role-based authentication, MongoDB aggregation, and modern UI dashboard.',
    language: 'JavaScript',
    stars: 6,
    forks: 2,
    url: 'https://github.com/belstyilkal-123'
  }
];

export const GitHubActivity: React.FC = () => {
  const { data, isPending: isLoading } = useGitHubOverview();
  const playPop = usePopSound();

  const activityData = [
    { day: 'Mon', commits: 4 },
    { day: 'Tue', commits: 7 },
    { day: 'Wed', commits: 3 },
    { day: 'Thu', commits: 9 },
    { day: 'Fri', commits: 6 },
    { day: 'Sat', commits: 12 },
    { day: 'Sun', commits: 5 },
  ];

  const maxCommits = Math.max(...activityData.map((d) => d.commits));

  const stats = [
    { label: 'Public Repos', value: isLoading ? '...' : `${data?.totalPublicRepos || 14}`, icon: Code2 },
    { label: 'Total Stars', value: isLoading ? '...' : `${data?.totalStars || 26}`, icon: Star },
    { label: 'Total Forks', value: isLoading ? '...' : `${data?.totalForks || 9}`, icon: GitFork },
    { label: 'Tracked Repos', value: isLoading ? '...' : `${data?.topRepos?.length || 3}`, icon: GitPullRequest },
  ];

  const displayedRepos = (data?.topRepos && data.topRepos.length > 0) ? data.topRepos : fallbackTopRepos;

  return (
    <div className="py-4 sm:py-8 space-y-8 sm:space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 mb-4 text-xs sm:text-sm font-medium">
          <GithubIcon size={16} />
          <span>Open Source Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          GitHub{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Activity
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Open source code contributions, public repositories, and commit patterns.
        </p>

        <a
          href="https://github.com/belstyilkal-123"
          target="_blank"
          rel="noreferrer"
          onClick={playPop}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white rounded-xl transition-all font-semibold text-xs sm:text-sm shadow-lg active:scale-95"
        >
          <GithubIcon size={16} />
          <span>Follow @belstyilkal-123</span>
          <ExternalLink size={14} />
        </a>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center group hover:shadow-lg transition-all border border-border dark:border-border-dark flex flex-col items-center justify-center"
          >
            <div className="inline-flex p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
              <stat.icon size={20} />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-text">{stat.value}</p>
            <p className="text-xs sm:text-sm text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Commit Activity Visualization */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-border dark:border-border-dark">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-primary/10 text-primary"><Activity size={18} /></div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-text">Weekly Commit Rhythm</h2>
            <p className="text-xs text-text-muted">Consistent development frequency across days of the week</p>
          </div>
        </div>

        <div className="flex items-end gap-2 sm:gap-4 h-28 sm:h-36 pt-4">
          {activityData.map((d, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-text">{d.commits}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.commits / maxCommits) * 100}%` }}
                transition={{ delay: 0.1 * idx, duration: 0.6, ease: 'easeOut' }}
                className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg min-h-[6px]"
              />
              <span className="text-[11px] sm:text-xs text-text-muted font-medium">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Repositories Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Code2 size={20} className="text-primary" />
          <h2 className="text-xl sm:text-2xl font-bold text-text">Top Repositories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedRepos.map((repo, idx) => (
            <div
              key={repo.name || idx}
              className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-border dark:border-border-dark hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <GithubIcon size={16} className="text-text-muted shrink-0" />
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playPop}
                      className="font-bold text-sm sm:text-base text-text group-hover:text-primary transition-colors truncate"
                    >
                      {repo.name}
                    </a>
                  </div>
                  <ExternalLink size={14} className="text-text-muted shrink-0 opacity-70 group-hover:opacity-100" />
                </div>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3 mb-4">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-text-muted border-t border-border/80 dark:border-border-dark/80 pt-3.5 mt-auto">
                <span className="flex items-center gap-1.5 font-medium">
                  <Circle size={8} className="text-primary fill-primary" />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={13} />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={13} />
                  {repo.forks}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
