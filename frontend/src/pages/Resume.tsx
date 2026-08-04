import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Mail, MapPin, Briefcase, GraduationCap, Code2, Award, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/icons';
import { personalInfo, skillsData, experienceData, educationData } from '../data/portfolioData';
import { useProjects } from '../hooks/useProjects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
      <h2 className="text-xl font-bold text-text">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-border dark:from-border-dark to-transparent" />
    </div>
    {children}
  </div>
);

export const Resume: React.FC = () => {
  const { data: projectsData, isLoading: projectsLoading } = useProjects();

  return (
    <div className="py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 text-sm font-medium">
          <FileText size={16} />
          Interactive Resume
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          My{' '}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Resume
          </span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto mb-8">
          A comprehensive overview of my experience, skills, and education. Download the PDF version or browse it here.
        </p>
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-2xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5"
        >
          <Download size={20} />
          Download PDF Resume
        </a>
      </motion.div>

      {/* Resume Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-panel rounded-3xl overflow-hidden border border-border dark:border-zinc-800/80 max-w-5xl mx-auto"
      >
        {/* Top color bar */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

        <div className="p-8 md:p-12">
          {/* Identity */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 pb-8 border-b border-border dark:border-border-dark">
            <div>
              <h2 className="text-4xl font-extrabold text-text mb-2">{personalInfo.name}</h2>
              <p className="text-xl text-primary font-semibold mb-4">{personalInfo.role}</p>
              <p className="text-text-muted max-w-xl leading-relaxed">{personalInfo.bio}</p>
            </div>
            <div className="space-y-3 text-sm shrink-0">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                <Mail size={16} className="text-primary" />
                {personalInfo.email}
              </a>
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin size={16} className="text-secondary" />
                Bahir Dar, Ethiopia
              </div>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                <GithubIcon size={16} className="text-text-muted" />
                {personalInfo.github.replace('https://github.com/', 'github.com/')}
              </a>
              <a href={personalInfo.linkedin} className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                <LinkedinIcon size={16} className="text-blue-500" />
                LinkedIn Profile
              </a>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div variants={itemVariants}>
            <Section title="Experience" icon={<Briefcase size={18} />}>
              {experienceData.map((exp, idx) => (
                <div key={idx} className="relative pl-6 pb-6 border-l-2 border-primary/30 last:border-0 last:pb-0">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-bg" />
                  <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">{exp.timeline}</span>
                  <h3 className="text-lg font-bold text-text">{exp.role}</h3>
                  <p className="text-secondary font-medium mb-2">{exp.company}</p>
                  <p className="text-text-muted text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </Section>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <Section title="Education" icon={<GraduationCap size={18} />}>
              {educationData.map((edu, idx) => (
                <div key={idx} className="relative pl-6 pb-6 border-l-2 border-secondary/30 last:border-0 last:pb-0">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-secondary border-2 border-bg" />
                  <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-semibold rounded-full mb-2">{edu.timeline}</span>
                  <h3 className="text-lg font-bold text-text">{edu.degree}</h3>
                  <p className="text-primary font-medium mb-2">{edu.institution}</p>
                  <p className="text-text-muted text-sm leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </Section>
          </motion.div>

          {/* Projects */}
          <motion.div variants={itemVariants}>
            <Section title="Key Projects" icon={<Code2 size={18} />}>
              {projectsLoading ? (
                <div className="glass-panel rounded-3xl p-8 border border-border dark:border-border-dark text-text-muted text-center">
                  Loading live project portfolio...
                </div>
              ) : !projectsData || projectsData.length === 0 ? (
                <div className="glass-panel rounded-3xl p-8 border border-border dark:border-border-dark text-text-muted text-center">
                  No live projects available yet. Add projects using the admin portal to showcase them here.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectsData.map((project, idx) => (
                    <div key={project._id || idx} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-border dark:border-zinc-700 hover:border-primary/40 transition-colors group">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-text group-hover:text-primary transition-colors mb-2 pr-2">{project.title}</h3>
                        <a href={project.githubUrl || personalInfo.github} target="_blank" rel="noreferrer" className="shrink-0 text-text-muted hover:text-primary transition-colors">
                          <ExternalLink size={16} />
                        </a>
                      </div>
                      <p className="text-xs text-text-muted mb-3 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech?.map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <Section title="Technical Skills" icon={<Award size={18} />}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {skillsData.map((category, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-bold text-text uppercase tracking-wider mb-3">{category.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill, sIdx) => (
                        <span key={sIdx} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-border dark:border-zinc-700 text-sm text-text rounded-lg font-medium">
                          {skill.name}
                        </span>
                      ))}
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
