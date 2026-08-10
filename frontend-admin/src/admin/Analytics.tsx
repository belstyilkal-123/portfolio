import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, TrendingUp, Users, Clock, MousePointerClick, GitBranch } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reposRes, activityRes] = await Promise.all([
          api.get('/github/repos'),
          api.get('/github/activity')
        ]);
        setRepos(reposRes.data || []);
        setActivity(activityRes.data || []);
      } catch (error) {
        console.error('Error fetching github data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRepos = repos.length;
  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  
  const langs = repos.reduce((acc: any, r) => {
    if (r.language) {
      acc[r.language] = (acc[r.language] || 0) + 1;
    }
    return acc;
  }, {});
  
  const topLangs = Object.keys(langs).map(k => ({ name: k, count: langs[k] })).sort((a, b) => b.count - a.count);
  const topLanguage = topLangs.length > 0 ? topLangs[0].name : 'N/A';

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Activity</h1>
          <p className="text-text-muted text-sm mt-1">Monitor your portfolio traffic and GitHub activity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-muted text-sm font-medium">Total Visits</p>
              <h3 className="text-3xl font-bold mt-2">12,847</h3>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl text-primary"><Users size={24} /></div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-500 font-medium">
            <TrendingUp size={16} className="mr-1" /> +12% this month
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-muted text-sm font-medium">Page Views</p>
              <h3 className="text-3xl font-bold mt-2">48,293</h3>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl text-primary"><MousePointerClick size={24} /></div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-500 font-medium">
            <TrendingUp size={16} className="mr-1" /> +8% this month
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-muted text-sm font-medium">Avg Session</p>
              <h3 className="text-3xl font-bold mt-2">2m 34s</h3>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl text-primary"><Clock size={24} /></div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-500 font-medium">
            <TrendingUp size={16} className="mr-1" /> +2s this month
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-muted text-sm font-medium">Bounce Rate</p>
              <h3 className="text-3xl font-bold mt-2">34.2%</h3>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl text-primary"><TrendingUp size={24} className="rotate-180 text-red-500" /></div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-500 font-medium">
            <TrendingUp size={16} className="mr-1 rotate-180" /> -1.5% this month
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><GitBranch size={24} /> GitHub Stats</h2>
      
      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-6 rounded-2xl">
                <p className="text-text-muted text-sm font-medium">Total Repos</p>
                <h3 className="text-3xl font-bold mt-2">{totalRepos}</h3>
              </div>
              <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-6 rounded-2xl">
                <p className="text-text-muted text-sm font-medium">Total Stars</p>
                <h3 className="text-3xl font-bold mt-2">{totalStars}</h3>
              </div>
              <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-6 rounded-2xl">
                <p className="text-text-muted text-sm font-medium">Top Language</p>
                <h3 className="text-2xl font-bold mt-2 truncate">{topLanguage}</h3>
              </div>
              <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-6 rounded-2xl">
                <p className="text-text-muted text-sm font-medium">Profile Views</p>
                <h3 className="text-3xl font-bold mt-2">1,247</h3>
              </div>
            </div>

            <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Top Languages</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topLangs.slice(0, 5)}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => `${value}`} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#18181b', borderRadius: '8px', border: 'none'}} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border dark:border-border-dark">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[500px] p-6 space-y-4">
              {activity.slice(0, 10).map((act, i) => (
                <div key={i} className="flex gap-4 items-start border-b border-border/50 pb-4 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-text">{act.type.replace('Event', '')} <span className="text-primary cursor-pointer hover:underline">{act.repo.name}</span></p>
                    <p className="text-xs text-text-muted mt-1">{new Date(act.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {activity.length === 0 && (
                 <p className="text-text-muted text-center text-sm">No recent activity.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
