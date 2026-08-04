import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, MessageSquare, ExternalLink, ArrowRight, Star, GitBranch } from 'lucide-react';
import { useAdminStats } from '../hooks/useAdminStats';
import { useAdminMessages } from '../hooks/useAdmin';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { data: adminStats, isLoading: statsLoading } = useAdminStats();
  const { data: messages, isLoading: messagesLoading } = useAdminMessages();

  const stats = [
    { label: 'Total Projects', value: statsLoading ? 'Loading...' : `${adminStats?.totalProjects ?? 0}`, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Live Projects', value: statsLoading ? 'Loading...' : `${adminStats?.liveProjects ?? 0}`, icon: ExternalLink, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { label: 'GitHub Repos', value: statsLoading ? 'Loading...' : `${adminStats?.totalGitHubRepos ?? 0}`, icon: GitBranch, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: 'GitHub Stars', value: statsLoading ? 'Loading...' : `${adminStats?.totalGitHubStars ?? 0}`, icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Unread Messages', value: statsLoading ? 'Loading...' : `${adminStats?.unreadMessages ?? 0}`, icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Admin Users', value: statsLoading ? 'Loading...' : `${adminStats?.adminUsers ?? 0}`, icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin dashboard</h1>
          <p className="text-text-muted">Overview of portfolio activity and GitHub metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass-panel p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold">Recent Messages</h2>
            <p className="text-sm text-text-muted">Latest contact form submissions.</p>
          </div>
          <Link to="/admin/messages" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">
            Open inbox <ArrowRight size={16} />
          </Link>
        </div>

        {messagesLoading ? (
          <div className="flex flex-col items-center justify-center h-48 text-zinc-400 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl">
            <p>Loading recent messages...</p>
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="space-y-3">
            {messages.slice(0, 3).map((message: any) => (
              <div key={message._id} className="rounded-2xl border border-border dark:border-border-dark p-4 bg-white/80 dark:bg-zinc-950/80">
                <div className="flex justify-between items-center gap-4 mb-2">
                  <p className="font-semibold">{message.subject}</p>
                  <span className="text-xs text-text-muted">{new Date(message.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-text-muted line-clamp-2">{message.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-zinc-400 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl">
            <p>No messages yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
