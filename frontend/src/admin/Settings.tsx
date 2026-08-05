import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Shield, ArrowLeftRight } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import { useGitHubSettings, useSaveSettings } from '../hooks/useAdmin';
import { Link } from 'react-router-dom';

export const AdminSettings: React.FC = () => {
  const { data: settings, isPending } = useGitHubSettings();
  const { mutateAsync: saveSettings, isPending: isSaving } = useSaveSettings();
  const [githubUsername, setGithubUsername] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setGithubUsername(settings.GITHUB_USERNAME || '');
      setGithubToken(settings.GITHUB_TOKEN || '');
    }
  }, [settings]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    try {
      await saveSettings({
        settings: {
          GITHUB_USERNAME: githubUsername,
          GITHUB_TOKEN: githubToken,
        },
      });
      setMessage('GitHub settings saved successfully.');
    } catch (error) {
      setMessage('Unable to save settings. Please try again.');
    }
  };

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-text-muted mt-2">Update GitHub integration credentials and manage portfolio sync behavior.</p>
        </div>
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark">
          <ArrowLeftRight size={16} /> Back to dashboard
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-border dark:border-border-dark p-8 max-w-3xl"
      >
        <div className="mb-6 flex items-center gap-3 text-text">
          <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-500">
            <GithubIcon size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">GitHub Integration</h2>
            <p className="text-sm text-text-muted">Control which GitHub account the portfolio uses for repo stats.</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSave}>
          <div className="space-y-2">
            <label htmlFor="github-username" className="text-sm font-medium text-text">GitHub Username</label>
            <input
              id="github-username"
              type="text"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="github.com/username"
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="github-token" className="text-sm font-medium text-text">GitHub Token</label>
            <input
              id="github-token"
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="Personal access token (optional)"
              className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={isPending}
            />
            <p className="text-xs text-text-muted">
              A token is optional but helps avoid GitHub rate limits. Keep it private and don’t share it publicly.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-text-muted">
            <div className="flex items-center gap-2 font-medium text-text mb-2">
              <Shield size={16} /> Secure storage
            </div>
            Your GitHub settings are stored securely in the backend database and used to fetch repository metrics for the portfolio.
          </div>

          {message && <div className="text-sm text-center text-primary">{message}</div>}

          <button
            type="submit"
            disabled={isPending || isSaving}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save GitHub Settings'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
