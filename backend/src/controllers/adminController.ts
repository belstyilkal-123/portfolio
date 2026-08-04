import { Request, Response } from 'express';
import Project from '../models/Project';
import Message from '../models/Message';
import User from '../models/User';

import { getSettingValue } from '../utils/settings';

const fetchGitHubStats = async () => {
  try {
    const githubUsername = await getSettingValue('GITHUB_USERNAME', process.env.GITHUB_USERNAME || 'belstyilkal-123');
    const githubToken = await getSettingValue('GITHUB_TOKEN', process.env.GITHUB_TOKEN || '');

    const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?type=owner&per_page=100`, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      throw new Error('GitHub API response is not an array');
    }

    const repoData = repos.filter((repo: any) => !repo.fork);
    const totalGitHubRepos = repoData.length;
    const totalGitHubStars = repoData.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);

    return { totalGitHubRepos, totalGitHubStars };
  } catch (error) {
    console.warn('GitHub stats fetch failed:', error);
    return { totalGitHubRepos: 0, totalGitHubStars: 0 };
  }
};

export const getAdminStats = async (req: Request, res: Response): Promise<void> => {
  const totalProjects = await Project.countDocuments();
  const liveProjects = await Project.countDocuments({ liveUrl: { $exists: true, $ne: '' } });
  const totalMessages = await Message.countDocuments();
  const unreadMessages = await Message.countDocuments({ isRead: false });
  const adminUsers = await User.countDocuments({ isAdmin: true });
  const { totalGitHubRepos, totalGitHubStars } = await fetchGitHubStats();

  res.json({ totalProjects, liveProjects, totalMessages, unreadMessages, adminUsers, totalGitHubRepos, totalGitHubStars });
};
