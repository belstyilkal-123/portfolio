import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from '../components/icons';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 py-8 px-6 mt-auto text-[#CBD5E1]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Professional Portfolio
          </h3>
          <p className="text-sm text-[#CBD5E1]/70 mt-1">
            Designed for clear technical storytelling and strong hiring impact.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
            <GithubIcon size={18} />
          </a>
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-secondary transition-colors">
              <LinkedinIcon size={18} />
            </a>
          )}
          <a href={personalInfo.telegram} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-secondary transition-colors">
            <TelegramIcon size={18} />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-[#CBD5E1]/60">
        <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        <span>Built with React, Node.js, and Framer Motion.</span>
      </div>
    </footer>
  );
};
