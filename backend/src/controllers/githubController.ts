import { Request, Response } from 'express';

import { getSettingValue } from '../utils/settings';

const GITHUB_API_BASE = 'https://api.github.com';

const buildHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const getGitHubOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = await getSettingValue('GITHUB_USERNAME', process.env.GITHUB_USERNAME || 'belstyilkal-123');
    const token = await getSettingValue('GITHUB_TOKEN', process.env.GITHUB_TOKEN || '');

    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?type=owner&per_page=100&sort=updated`,
      { headers: buildHeaders(token) }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API failed with ${response.status}: ${errorText}`);
    }

    const repos = await response.json();

    const repoList = Array.isArray(repos)
      ? repos
          .filter((repo) => !repo.fork)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || '',
            language: repo.language || 'Unknown',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
            homepage: repo.homepage || '',
            updatedAt: repo.updated_at,
          }))
          .sort((a: any, b: any) => b.stars - a.stars)
          .slice(0, 6)
      : [];

    const totalStars = Array.isArray(repos)
      ? repos.reduce((sum, repo: any) => sum + (repo.stargazers_count || 0), 0)
      : 0;

    const totalForks = Array.isArray(repos)
      ? repos.reduce((sum, repo: any) => sum + (repo.forks_count || 0), 0)
      : 0;

    const totalPublicRepos = Array.isArray(repos) ? repos.length : 0;

    res.json({ totalPublicRepos, totalStars, totalForks, topRepos: repoList });
  } catch (error: any) {
    console.error('GitHub overview fetch error:', error);
    res.status(500).json({ message: 'Unable to fetch GitHub overview.', error: error.message });
  }
};
