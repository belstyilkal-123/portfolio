import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon, InstagramIcon, FacebookIcon } from '../components/icons';
import { useSettingsStore } from '../stores/useSettingsStore';
import { usePopSound } from '../hooks/usePopSound';

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

  return (
    <footer className="mt-20 border-t border-border dark:border-border-dark bg-surface/50 dark:bg-surface-dark/50 py-16 px-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 bg-gradient-to-br from-text to-text-muted bg-clip-text text-transparent">
          Thanks for stopping by! ☕
        </h2>
        <p className="text-text-muted mb-10 max-w-lg font-medium leading-relaxed">
          I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          {[
            { icon: <GithubIcon size={20} />, url: github, label: 'GitHub', color: 'hover:text-primary hover:bg-primary/10' },
            { icon: <LinkedinIcon size={20} />, url: linkedin, label: 'LinkedIn', color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10' },
            { icon: <TelegramIcon size={20} />, url: telegram, label: 'Telegram', color: 'hover:text-[#26A5E4] hover:bg-[#26A5E4]/10' },
            { icon: <InstagramIcon size={20} />, url: instagram, label: 'Instagram', color: 'hover:text-[#E4405F] hover:bg-[#E4405F]/10' },
            { icon: <FacebookIcon size={20} />, url: facebook, label: 'Facebook', color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10' },
            { icon: <Mail size={20} />, url: `mailto:${email}`, label: 'Email', color: 'hover:text-emerald-500 hover:bg-emerald-500/10' },
          ].map((link, idx) => link.url && (
            <motion.a
              key={idx}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href={link.url}
              target={link.url.startsWith('mailto') ? '_self' : '_blank'}
              rel="noreferrer"
              onClick={playPop}
              className={`p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-text-muted transition-colors ${link.color}`}
              aria-label={link.label}
              title={link.label}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full pt-8 border-t border-border dark:border-border-dark text-sm font-medium text-text-muted">
          <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            Crafted with <span className="text-red-500">♥</span> using React & Framer Motion
          </p>
        </div>

      </div>
    </footer>
  );
};
