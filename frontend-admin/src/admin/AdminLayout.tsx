import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { LogOut, LayoutDashboard, Briefcase, Settings, MessageSquare } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuthStore();

  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
  };

  return (
    <div className="min-h-screen bg-bg text-text flex">
      <aside className="w-64 fixed left-0 top-0 h-screen bg-surface dark:bg-surface-dark border-r border-border dark:border-border-dark flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border dark:border-border-dark">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Admin CMS</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">        <LayoutDashboard size={20} /> Dashboard</Link>
          <Link to="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-text-muted hover:text-text transition-colors">        <Briefcase size={20} /> Projects</Link>
          <Link to="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-text-muted hover:text-text transition-colors">        <MessageSquare size={20} /> Messages</Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-text-muted hover:text-text transition-colors">        <Settings size={20} /> Settings</Link>
        </nav>
        <div className="p-4 border-t border-border dark:border-border-dark">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors font-medium text-sm">        <LogOut size={16} /> Sign Out</button>
        </div>
      </aside>
      <main className="flex-1 ml-64 p-8 min-h-screen relative">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
