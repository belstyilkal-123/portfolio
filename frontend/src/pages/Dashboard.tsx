import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import { SEO } from '../components/SEO';
import { useProjects } from '../hooks/useProjects';
import { Link } from 'react-router-dom';
import { useSettingsStore } from '../stores/useSettingsStore';

// --- TypeWriter Component ---
const TypeWriter: React.FC<{ words: string[]; speed?: number; pause?: number }> = ({
  words,
  speed = 80,
  pause = 2000,
}) => {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return (
    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
      {displayed}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};

// --- Dashboard ---
export const Dashboard: React.FC = () => {
  const { data: projectsData = [], isPending: projectsLoading } = useProjects();
  const { getSetting } = useSettingsStore();

  const name = getSetting('name', 'Belstie Yilkal');
  const tagline = getSetting('tagline', 'Building reliable web and IoT products with clean code, strong architecture, and practical business value.');
  const location = getSetting('location', 'Bahir Dar, Ethiopia');
  const showHero = getSetting('showHero', 'true') !== 'false';
  const showFeaturedProjects = getSetting('showFeaturedProjects', 'true') !== 'false';

  const summaryCards = [
    { label: 'Experience', value: '2+ years', detail: 'Real-world web development and internships' },
    { label: 'Projects', value: `${projectsLoading ? '...' : `${projectsData.length}`}`, detail: 'Web apps, management tools, and IoT prototypes' },
    { label: 'Stack', value: 'React · Node · Mongo', detail: 'Modern stacks for production systems' },
    { label: 'Status', value: 'Open to work', detail: 'Remote, hybrid, and local roles' },
  ];

  const typeWords = [
    name,
    'a Full-Stack Dev',
    'an IoT Builder',
    'a Problem Solver',
  ];

  return (
    <>
      <SEO
        title="Home"
        description="Belstie Yilkal - Software Developer and IT student building full-stack applications, IoT solutions, and modern web systems."
      />

      <div className="flex flex-col gap-16 py-12">
        {/* HERO */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          {/* Left: Text */}
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
                <TypeWriter words={typeWords} />
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
                  <span className="text-lg font-bold px-0.5">in</span>
                </a>
              )}
              {personalInfo.telegram && (
                <a href={personalInfo.telegram} target="_blank" rel="noreferrer" className="p-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-full hover:text-accent transition-colors hover:scale-110 transform duration-200">
                  <span className="sr-only">Telegram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
                  </svg>
                </a>
              )}
              <a href={`mailto:${personalInfo.email}`} className="p-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-full hover:text-accent transition-colors hover:scale-110 transform duration-200">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right: Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 rounded-[3rem] blur-3xl"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-border dark:border-border-dark bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 shadow-2xl">
              <div className="p-8 flex flex-col gap-6">

                {/* Profile Photo */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    {/* Glow ring */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-sm opacity-70"></div>
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white/80 dark:border-zinc-800 shadow-2xl">
                      <img
                        src="/profile.jpg"
                        alt="Belstie Yilkal"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    {/* Online badge */}
                    <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-900 shadow-md"></span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">{personalInfo.name}</p>
                    <p className="text-sm text-text-muted">{personalInfo.role}</p>
                  </div>
                </div>

                {/* Mini stat chips */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/90 p-4 border border-border dark:bg-zinc-950/80 dark:border-border-dark">
                    <p className="text-xs uppercase tracking-[0.25em] text-text-muted">Focus</p>
                    <p className="mt-2 font-semibold text-sm">Web platforms</p>
                  </div>
                  <div className="rounded-2xl bg-white/90 p-4 border border-border dark:bg-zinc-950/80 dark:border-border-dark">
                    <p className="text-xs uppercase tracking-[0.25em] text-text-muted">Skills</p>
                    <p className="mt-2 font-semibold text-sm">Full-stack · IoT</p>
                  </div>
                </div>

                {/* Location */}
                <div className="rounded-2xl bg-white/90 p-4 border border-border dark:bg-zinc-950/80 dark:border-border-dark flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-text-muted">Location</p>
                    <p className="font-semibold text-sm mt-0.5">{personalInfo.location}</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* FEATURED PROJECTS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl p-8 border border-border dark:border-border-dark"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-primary font-semibold">Featured work</p>
              <h2 className="text-3xl font-bold mt-4">Recent systems I&apos;ve built</h2>
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
                <div key={project._id || project.title || index} className="rounded-[2rem] border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                  <p className="text-sm uppercase tracking-[0.35em] text-text-muted mb-3">{project.tech?.join(' · ')}</p>
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-text-muted leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.features?.slice(0, 3).map((feature: string, idx: number) => (
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
