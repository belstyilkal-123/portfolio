import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { 
  LogOut, LayoutDashboard, Briefcase, Settings, MessageSquare, 
  BarChart2, PenSquare, Zap, FileText, Star, UserCircle, Image, Bell, GraduationCap, Award, Palette
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');
  
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Profile', path: '/admin/profile', icon: UserCircle },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Skills', path: '/admin/skills', icon: Zap },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Education', path: '/admin/education', icon: GraduationCap },
    { name: 'Certificates', path: '/admin/certificates', icon: Award },
    { name: 'Resume', path: '/admin/resume', icon: FileText },
    { name: 'Blog', path: '/admin/blog', icon: PenSquare },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Media', path: '/admin/media', icon: Image },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart2 },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-bg text-text flex">
      <aside className="w-64 fixed left-0 top-0 h-screen bg-surface dark:bg-surface-dark border-r border-border dark:border-border-dark flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border dark:border-border-dark shrink-0">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Admin CMS</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-text-muted hover:text-text'}`}>
                <Icon size={20} /> {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border dark:border-border-dark shrink-0">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors font-medium text-sm">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-64 min-h-screen flex flex-col relative">
        <header className="h-16 flex items-center justify-end px-8 border-b border-border dark:border-border-dark shrink-0">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'light' ? <span>🌙</span> : <span>☀️</span>}
          </button>
        </header>
        <div className="p-8 flex-1">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
