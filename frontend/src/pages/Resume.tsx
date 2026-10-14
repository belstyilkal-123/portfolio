import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Mail, MapPin, Briefcase, GraduationCap, Code2, Award, ExternalLink, Printer } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from '../components/icons';
import { useSettingsStore } from '../stores/useSettingsStore';
import { useSkills, useExperience, useEducation } from '../hooks/useResume';
import { useProjects } from '../hooks/useProjects';
import { usePopSound } from '../hooks/usePopSound';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="mb-8 sm:mb-10">
    <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
      <div className="p-2 rounded-xl bg-primary/10 text-primary">{icon}</div>
      <h2 className="text-lg sm:text-xl font-bold text-text">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-border dark:from-border-dark to-transparent" />
    </div>
    {children}
  </div>
);

export const Resume: React.FC = () => {
  const { getSetting } = useSettingsStore();
  const playPop = usePopSound();

  const name = getSetting('name', 'Belstie Yilkal');
  const role = getSetting('role', 'Software Developer');
  const bio = getSetting('bio', 'Full-stack software developer with expertise in React, TypeScript, Node.js, and IoT systems. Passionate about writing clean, maintainable code that solves real business problems.');
  const email = getSetting('email', 'belstyilkal@gmail.com');
  const location = getSetting('location', 'Bahir Dar, Ethiopia');
  const github = getSetting('githubUrl') || getSetting('github_url') || 'https://github.com/belstyilkal-123';
  const linkedin = getSetting('linkedinUrl') || getSetting('linkedin_url') || 'https://www.linkedin.com/in/belst-yilkal-443614422';
  const telegram = getSetting('telegramUrl') || getSetting('telegram_url') || 'https://t.me/manchilot123';

  const { data: projectsData = [] } = useProjects();
  const { data: skillsData = [], isLoading: loadingSkills } = useSkills();
  const { data: experienceData = [], isLoading: loadingExp } = useExperience();
  const { data: educationData = [], isLoading: loadingEdu } = useEducation();

  // Fallback defaults
  const fallbackExp = [
    {
      role: 'Full-Stack Software Developer Intern',
      company: 'Tech Solutions & Systems',
      timeline: '2024 - Present',
      description: 'Engineered web platforms using React, Node.js, and MongoDB. Developed scalable REST endpoints and responsive client interfaces.'
    },
    {
      role: 'IoT Firmware Developer',
      company: 'University Innovation Lab',
      timeline: '2023 - 2024',
      description: 'Built embedded firmware using C++ on ESP32 microcontrollers. Streamed sensor metrics via MQTT brokers to web dashboards.'
    }
  ];

  const fallbackEdu = [
    {
      degree: 'BSc in Information Technology',
      school: 'Bahir Dar University',
      timeline: '2022 - 2026',
      description: 'Major coursework in Software Engineering, Data Structures & Algorithms, Database Systems, Computer Networks, and Cybersecurity.'
    }
  ];

  const activeExp = experienceData.length > 0 ? experienceData : fallbackExp;
  const activeEdu = educationData.length > 0 ? educationData : fallbackEdu;

  // Group skills by category
  const groupedSkills = skillsData.reduce((acc: Record<string, any[]>, skill: any) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedSkills).sort();

  if (loadingSkills && loadingExp && loadingEdu) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handlePrint = () => {
    playPop();
    window.print();
  };

  return (
    <div className="py-4 sm:py-8 space-y-8 sm:space-y-12">
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <FileText size={16} />
          <span>Curriculum Vitae</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Interactive{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Resume
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Comprehensive summary of my engineering credentials, practical experience, academic background, and toolkit.
        </p>

        {/* CTA Download & Print Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href="/resume.pdf"
            download
            onClick={playPop}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 text-xs sm:text-sm"
          >
            <Download size={16} />
            <span>Download Official PDF</span>
          </a>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-text font-semibold rounded-xl transition-all border border-border dark:border-border-dark text-xs sm:text-sm"
          >
            <Printer size={16} />
            <span>Print Page</span>
          </button>
        </div>
      </motion.div>

      {/* Main Resume Sheet */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border border-border dark:border-border-dark max-w-4xl mx-auto shadow-2xl"
      >
        {/* Top color bar */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

        <div className="p-5 sm:p-8 md:p-12">
          {/* Identity & Contact Header */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-border dark:border-border-dark"
          >
            <div className="max-w-lg">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text mb-1">{name}</h2>
              <p className="text-base sm:text-lg text-primary font-bold mb-3">{role}</p>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{bio}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 text-xs sm:text-sm shrink-0 w-full md:w-auto">
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                <Mail size={15} className="text-primary shrink-0" />
                <span className="truncate">{email}</span>
              </a>
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin size={15} className="text-secondary shrink-0" />
                <span>{location}</span>
              </div>
              <a href={github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                <GithubIcon size={15} className="text-text-muted shrink-0" />
                <span>github.com/belstyilkal-123</span>
              </a>
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                  <LinkedinIcon size={15} className="text-blue-500 shrink-0" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
              {telegram && (
                <a href={telegram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-muted hover:text-secondary transition-colors">
                  <TelegramIcon size={15} className="text-text-muted shrink-0" />
                  <span>Telegram</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div variants={itemVariants}>
            <Section title="Experience" icon={<Briefcase size={18} />}>
              <div className="space-y-6">
                {activeExp.map((exp: any, idx: number) => (
                  <div key={idx} className="relative pl-5 sm:pl-6 border-l-2 border-primary/40 last:border-0">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] font-bold rounded-full mb-1.5">
                      {exp.timeline}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-text">{exp.role}</h3>
                    <p className="text-xs sm:text-sm text-secondary font-semibold mb-2">{exp.company}</p>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={itemVariants}>
            <Section title="Education" icon={<GraduationCap size={18} />}>
              <div className="space-y-6">
                {activeEdu.map((edu: any, idx: number) => (
                  <div key={idx} className="relative pl-5 sm:pl-6 border-l-2 border-secondary/40 last:border-0">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-secondary" />
                    <span className="inline-block px-2.5 py-0.5 bg-secondary/10 text-secondary text-[11px] font-bold rounded-full mb-1.5">
                      {edu.timeline}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-text">{edu.degree}</h3>
                    <p className="text-xs sm:text-sm text-primary font-semibold mb-2">{edu.school || edu.institution}</p>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          </motion.div>

          {/* Key Projects Section */}
          <motion.div variants={itemVariants}>
            <Section title="Key Engineered Projects" icon={<Code2 size={18} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(projectsData.length > 0 ? projectsData.slice(0, 4) : [
                  { title: 'Full-Stack Management System', description: 'React, Node.js, Express, MongoDB authentication and admin portal.', tech: ['React', 'Node.js', 'MongoDB'], liveUrl: '#' },
                  { title: 'ESP32 IoT Telemetry Gateway', description: 'C++ firmware, MQTT broker, and live real-time dashboard visualization.', tech: ['C++', 'ESP32', 'MQTT'], liveUrl: '#' },
                ]).map((project: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-border dark:border-border-dark flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-bold text-sm text-text">{project.title}</h4>
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-text-muted hover:text-primary">
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tech?.slice(0, 3).map((t: string, tIdx: number) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </motion.div>

          {/* Technical Skills Section */}
          <motion.div variants={itemVariants}>
            <Section title="Technical Competencies" icon={<Award size={18} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(sortedCategories.length > 0 ? sortedCategories : ['Frontend', 'Backend', 'IoT & Embedded']).map((cat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-border dark:border-border-dark">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">{cat}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {groupedSkills[cat] ? (
                        groupedSkills[cat].map((s: any, sIdx: number) => (
                          <span key={sIdx} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700/60 rounded text-xs text-text font-medium">
                            {s.name}
                          </span>
                        ))
                      ) : (
                        ['React', 'TypeScript', 'Node.js', 'MongoDB', 'ESP32'].map((s, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700/60 rounded text-xs text-text font-medium">
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};
