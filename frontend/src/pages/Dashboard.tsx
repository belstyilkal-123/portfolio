import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import { SEO } from '../components/SEO';
import { personalInfo } from '../data/portfolioData';
import { useProjects } from '../hooks/useProjects';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { data: projectsData = [], isPending: projectsLoading } = useProjects();

  const summaryCards = [
    { label: 'Experience', value: '2+ years', detail: 'Real-world web development and internships' },
    { label: 'Projects', value: `${projectsLoading ? 'Loading...' : `${projectsData.length} projects`}`, detail: 'Web apps, management tools, and IoT prototypes' },
    { label: 'Tools', value: 'React · Node.js · MongoDB', detail: 'Modern stacks for production systems' },
    { label: 'Availability', value: 'Open to work', detail: 'Remote, hybrid, and local roles' }
  ];

  return (
    <>
      <SEO
        title="Home"
        description="Belstie Yilkal - Software Developer and IT student building full-stack applications, IoT solutions, and modern web systems."
      />

      <div className="flex flex-col gap-16 py-12">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 w-fit">
              <span className="flex w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Actively seeking professional opportunities
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Hi, I&apos;m <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-text-muted font-medium mt-4">
                {personalInfo.role}
              </h2>
            </div>

            <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
              {personalInfo.tagline}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {summaryCards.map((card) => (
                <div key={card.label} className="glass-panel p-5 rounded-3xl border border-border dark:border-border-dark">
                  <p className="text-sm uppercase tracking-[0.3em] text-text-muted mb-3">{card.label}</p>
                  <p className="text-3xl font-semibold">{card.value}</p>
                  <p className="text-sm text-text-muted mt-3">{card.detail}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/projects" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-2xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 font-medium">
                View Projects <ArrowRight size={18} />
              </Link>
              <a href="/resume.pdf" download className="flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-text dark:text-white rounded-2xl transition-all font-medium border border-border dark:border-border-dark">
                <Download size={18} /> Download CV
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-border dark:border-border-dark">
              <p className="text-sm text-text-muted font-medium">Connect with me:</p>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="p-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-full hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <GithubIcon size={20} />
              </a>
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-full hover:text-secondary transition-colors hover:scale-110 transform duration-200">
                  <span className="sr-only">LinkedIn</span>
                  <span className="text-lg">in</span>
                </a>
              )}
              <a href={`mailto:${personalInfo.email}`} className="p-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-full hover:text-accent transition-colors hover:scale-110 transform duration-200">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 rounded-[3rem] blur-3xl"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-border dark:border-border-dark bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 shadow-2xl">
              <div className="p-10 min-h-[520px] flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 text-sm font-semibold text-text shadow-sm border border-white/70">
                    Professional portfolio
                  </div>
                  <div className="space-y-4">
                    <p className="text-text-muted leading-relaxed">
                      I help teams and clients launch dependable products by combining web development, backend services, and IoT integration.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-3xl bg-white/90 p-5 border border-border dark:bg-zinc-950/80 dark:border-border-dark">
                        <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Focus</p>
                        <p className="mt-3 font-semibold">Web platforms</p>
                      </div>
                      <div className="rounded-3xl bg-white/90 p-5 border border-border dark:bg-zinc-950/80 dark:border-border-dark">
                        <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Skills</p>
                        <p className="mt-3 font-semibold">Full-stack, networks, IoT</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white/90 p-6 border border-border dark:bg-zinc-950/80 dark:border-border-dark">
                  <p className="text-sm uppercase tracking-[0.3em] text-text-muted mb-4">Current location</p>
                  <p className="text-xl font-semibold">{personalInfo.location}</p>
                  <p className="text-sm text-text-muted mt-2">Available for remote or local opportunities.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl p-8 border border-border dark:border-border-dark"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-primary font-semibold">Featured work</p>
              <h2 className="text-3xl font-bold mt-4">Recent systems I’ve built</h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-2xl transition-all font-medium">
              View all projects <ArrowRight size={18} />
            </Link>
          </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
            {projectsData.length === 0 ? (
              <div className="glass-panel rounded-3xl p-12 border border-border dark:border-border-dark text-center text-text-muted col-span-full">
                No live projects found yet. Add a project from the admin panel to populate this section.
              </div>
            ) : (
              projectsData.slice(0, 2).map((project, index) => (
                <div key={project._id || project.title || index} className="rounded-[2rem] border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.35em] text-text-muted mb-3">{project.tech?.join(' · ')}</p>
                  <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                  <p className="text-text-muted leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.features?.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="px-3 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-sm text-text-muted">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.section>
      </div>
    </>
  );
};
