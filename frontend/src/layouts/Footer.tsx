import React from 'react';
import { Mail, ArrowUp, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon, InstagramIcon, FacebookIcon } from '../components/icons';
import { useSettingsStore } from '../stores/useSettingsStore';
import { usePopSound } from '../hooks/usePopSound';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { getSetting } = useSettingsStore();
  const playPop = usePopSound();

  const name = getSetting('name', 'Belstie Yilkal');
  const github = getSetting('githubUrl') || getSetting('github_url') || 'https://github.com/belstyilkal-123';
  const linkedin = getSetting('linkedinUrl') || getSetting('linkedin_url') || 'https://www.linkedin.com/in/belst-yilkal-443614422';
  const telegram = getSetting('telegramUrl') || getSetting('telegram_url') || 'https://t.me/manchilot123';
  const instagram = getSetting('instagramUrl') || getSetting('instagram_url') || 'https://www.instagram.com/yilkal3555/';
  const facebook = getSetting('facebookUrl') || getSetting('facebook_url') || 'https://web.facebook.com/profile.php?id=61592192108357';
  const email = getSetting('email', 'belstyilkal@gmail.com');

  const scrollToTop = () => {
    playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navColumns = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Skills', path: '/skills' },
      ]
    },
    {
      title: 'Career',
      links: [
        { name: 'Experience', path: '/experience' },
        { name: 'Education', path: '/education' },
        { name: 'Certificates', path: '/certificates' },
        { name: 'Resume', path: '/resume' },
      ]
    },
    {
      title: 'Showcase',
      links: [
        { name: 'Services', path: '/services' },
        { name: 'Timeline', path: '/timeline' },
        { name: 'Achievements', path: '/achievements' },
        { name: 'Contact', path: '/contact' },
      ]
    }
  ];

  const socialLinks = [
    { icon: <GithubIcon size={18} />, url: github, label: 'GitHub', hover: 'hover:text-primary hover:border-primary/40' },
    { icon: <LinkedinIcon size={18} />, url: linkedin, label: 'LinkedIn', hover: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40' },
    { icon: <TelegramIcon size={18} />, url: telegram, label: 'Telegram', hover: 'hover:text-[#26A5E4] hover:border-[#26A5E4]/40' },
    { icon: <InstagramIcon size={18} />, url: instagram, label: 'Instagram', hover: 'hover:text-[#E4405F] hover:border-[#E4405F]/40' },
    { icon: <FacebookIcon size={18} />, url: facebook, label: 'Facebook', hover: 'hover:text-[#1877F2] hover:border-[#1877F2]/40' },
    { icon: <Mail size={18} />, url: `mailto:${email}`, label: 'Email', hover: 'hover:text-emerald-500 hover:border-emerald-500/40' },
  ];

  return (
    <footer className="w-full border-t border-border/80 dark:border-border-dark/80 bg-surface/50 dark:bg-surface-dark/50 pt-12 sm:pt-16 pb-24 md:pb-12 relative overflow-hidden transition-colors">
      
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-border/80 dark:border-border-dark/80">
          
          {/* Brand & Bio (2 Columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link 
              to="/" 
              onClick={playPop}
              className="inline-block font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              {name}
            </Link>
            
            <p className="text-xs sm:text-sm text-text-muted max-w-sm leading-relaxed">
              Software Developer & IT Student building responsive web platforms, scalable APIs, and connected IoT solutions with clean code.
            </p>

            {/* Availability status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Available for full-stack engineering roles</span>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {socialLinks.map((link, idx) => link.url && (
                <a
                  key={idx}
                  href={link.url}
                  target={link.url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noreferrer"
                  onClick={playPop}
                  className={`p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-border dark:border-border-dark text-text-muted transition-all hover:scale-105 active:scale-95 ${link.hover}`}
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Sitemap (3 Columns) */}
          {navColumns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-text font-mono">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={playPop}
                      className="text-xs sm:text-sm text-text-muted hover:text-primary transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted font-medium">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {name}. Built for high performance & reliability.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart size={12} className="text-red-500 fill-red-500" /> & React
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-text transition-colors"
              title="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
