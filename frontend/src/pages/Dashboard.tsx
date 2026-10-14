import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin, Sparkles as SparklesIcon, CheckCircle2, Check, Terminal, ExternalLink } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, TelegramIcon, FacebookIcon } from '../components/icons';
import { SEO } from '../components/SEO';
import { useProjects } from '../hooks/useProjects';
import { Link } from 'react-router-dom';
import { useSettingsStore } from '../stores/useSettingsStore';
import { CodeWindow } from '../components/ui/CodeWindow';
import { Sparkles } from '../components/ui/Sparkles';
import { usePopSound } from '../hooks/usePopSound';

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
    <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
      {displayed}
      <span className="animate-pulse text-primary font-bold">|</span>
    </span>
  );
};

// --- Dashboard ---
export const Dashboard: React.FC = () => {
  const { data: projectsData = [], isPending: projectsLoading } = useProjects();
  const { getSetting } = useSettingsStore();
  const playPop = usePopSound();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const name = getSetting('name', 'Belstie Yilkal');
  const tagline = getSetting('tagline', 'Building reliable web and IoT products with clean code, strong architecture, and practical business value.');
  const location = getSetting('location', 'Bahir Dar, Ethiopia');
  const role = getSetting('role', 'Software Developer');
  const githubUrl = getSetting('githubUrl') || getSetting('github_url') || 'https://github.com/belstyilkal-123';
  const linkedinUrl = getSetting('linkedinUrl') || getSetting('linkedin_url') || 'https://www.linkedin.com/in/belst-yilkal-443614422';
  const telegramUrl = getSetting('telegramUrl') || getSetting('telegram_url') || 'https://t.me/manchilot123';
  const instagramUrl = getSetting('instagramUrl') || getSetting('instagram_url') || 'https://www.instagram.com/yilkal3555/';
  const facebookUrl = getSetting('facebookUrl') || getSetting('facebook_url') || 'https://web.facebook.com/profile.php?id=61592192108357';
  const email = getSetting('email', 'belstyilkal@gmail.com');
  const avatarUrl = getSetting('avatarUrl', '/profile.jpg');

  const copyEmailToClipboard = async () => {
    playPop();
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const summaryCards = [
    { label: 'Experience', value: '2+ Years', detail: 'Web apps & practical internships' },
    { label: 'Projects', value: `${projectsLoading ? '...' : `${projectsData.length || '10+'}`}`, detail: 'Full-stack & IoT prototypes' },
    { label: 'Tech Stack', value: 'React · Node', detail: 'MERN & TypeScript ecosystem' },
    { label: 'Status', value: 'Open to Work', detail: 'Remote, hybrid & local roles' },
  ];

  const typeWords = [
    role,
    'Full-Stack Developer',
    'IoT & Hardware Builder',
    'IT Student & Engineer',
  ];

  const coreSkills = [
    'React.js', 'Node.js', 'TypeScript', 'MongoDB', 'Express',
    'C++ / ESP32', 'MQTT', 'Tailwind CSS', 'REST APIs', 'Git / GitHub'
  ];

  return (
    <>
      <SEO
        title="Home"
        description="Belstie Yilkal - Software Developer and IT student building full-stack applications, IoT solutions, and modern web systems."
      />

      <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24 py-4 sm:py-8">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Introduction & Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium border border-primary/20 w-fit">
              <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>Available for full-time & contract roles</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Hi <motion.span
                      className="inline-block origin-[70%_70%]"
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                    >👋</motion.span>, I&apos;m <br />
                <Sparkles color="#10B981">
                  <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
                    {name}
                  </span>
                </Sparkles>
              </h1>
              
              <div className="text-lg sm:text-2xl md:text-3xl text-text-muted font-medium mt-3 sm:mt-4 flex items-center gap-2 flex-wrap">
                <span>I build as a</span>
                <TypeWriter words={typeWords} />
              </div>
            </div>

            {/* Tagline */}
            <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl leading-relaxed">
              {tagline}
            </p>

            {/* Summary Metrics Grid (2 cols on mobile, 4 on tablet/desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              {summaryCards.map((card) => (
                <div 
                  key={card.label} 
                  className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-border dark:border-border-dark flex flex-col justify-between"
                >
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-text-muted font-semibold">{card.label}</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1 text-text">{card.value}</p>
                  <p className="text-[11px] sm:text-xs text-text-muted mt-1 leading-snug truncate">{card.detail}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <Link 
                to="/projects" 
                onClick={playPop}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 font-semibold text-sm sm:text-base active:scale-[0.98]"
              >
                <span>Explore Projects</span>
                <ArrowRight size={18} />
              </Link>

              <a 
                href="/resume.pdf" 
                download 
                onClick={playPop}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-text rounded-xl transition-all font-semibold text-sm sm:text-base border border-border dark:border-border-dark active:scale-[0.98]"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>

              <Link 
                to="/contact" 
                onClick={playPop}
                className="flex items-center justify-center gap-2 px-4 py-3.5 text-text-muted hover:text-text hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors font-medium text-sm sm:text-base"
              >
                <span>Get in touch</span>
              </Link>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-4 sm:pt-6 border-t border-border/80 dark:border-border-dark/80">
              <span className="text-xs sm:text-sm text-text-muted font-medium mr-1">Connect:</span>
              
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                onClick={playPop}
                className="p-2 sm:p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-border dark:border-border-dark text-text-muted hover:text-primary hover:border-primary/40 transition-all hover:scale-110"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <GithubIcon size={18} />
              </a>

              {linkedinUrl && (
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={playPop}
                  className="p-2 sm:p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-border dark:border-border-dark text-text-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all hover:scale-110"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
              )}

              {telegramUrl && (
                <a 
                  href={telegramUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={playPop}
                  className="p-2 sm:p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-border dark:border-border-dark text-text-muted hover:text-[#26A5E4] hover:border-[#26A5E4]/40 transition-all hover:scale-110"
                  aria-label="Telegram"
                  title="Telegram"
                >
                  <TelegramIcon size={18} />
                </a>
              )}

              {instagramUrl && (
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={playPop}
                  className="p-2 sm:p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-border dark:border-border-dark text-text-muted hover:text-pink-500 hover:border-pink-500/40 transition-all hover:scale-110"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
              )}

              {facebookUrl && (
                <a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={playPop}
                  className="p-2 sm:p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-border dark:border-border-dark text-text-muted hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all hover:scale-110"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <FacebookIcon size={18} />
                </a>
              )}

              <button 
                type="button"
                onClick={copyEmailToClipboard}
                className="p-2 sm:p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-border dark:border-border-dark text-text-muted hover:text-emerald-500 hover:border-emerald-500/40 transition-all hover:scale-110 flex items-center gap-1.5"
                aria-label="Copy Email"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check size={18} className="text-emerald-500" /> : <Mail size={18} />}
                {copiedEmail && <span className="text-xs text-emerald-500 font-medium hidden sm:inline">Copied!</span>}
              </button>
            </div>
          </motion.div>

          {/* Right Column: Developer Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="relative w-full max-w-md mx-auto lg:max-w-none"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/15 rounded-3xl blur-2xl opacity-60"></div>

            {/* Profile Card Surface */}
            <div className="relative rounded-3xl overflow-hidden border border-border/80 dark:border-border-dark/80 bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-6">
              
              {/* Photo & Role */}
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative shrink-0">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-primary/20 shadow-lg">
                    <img
                      src={avatarUrl}
                      alt={name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Active status dot */}
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900 shadow-md"></span>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1.5">
                    <CheckCircle2 size={12} /> Verified Developer
                  </div>
                  <h2 className="text-2xl font-bold text-text">{name}</h2>
                  <p className="text-sm text-text-muted mt-0.5">{role}</p>
                  <p className="text-xs text-text-muted/80 mt-1">Bahir Dar University IT</p>
                </div>
              </div>

              {/* Info Badges */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-3 border border-border/60 dark:border-border-dark/60">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Specialty</p>
                  <p className="text-xs sm:text-sm font-semibold mt-1 text-text">Full-Stack & Web</p>
                </div>
                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-3 border border-border/60 dark:border-border-dark/60">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Hardware</p>
                  <p className="text-xs sm:text-sm font-semibold mt-1 text-text">IoT & Embedded</p>
                </div>
              </div>

              {/* Location & Contact Bar */}
              <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-3.5 border border-border/60 dark:border-border-dark/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold">Location</p>
                    <p className="text-xs sm:text-sm font-semibold text-text">{location}</p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  onClick={playPop}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-colors"
                >
                  Contact
                </Link>
              </div>

            </div>
          </motion.div>
        </section>

        {/* TECH STACK STRIP */}
        <section className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border dark:border-border-dark">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-text-muted shrink-0">
              <Terminal size={16} className="text-primary" />
              <span>Core Technologies:</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {coreSkills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-xs font-medium text-text border border-border/60 dark:border-border-dark/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED WORK PREVIEW */}
        <section className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary font-bold">Portfolio Showcase</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 text-text">Featured Engineering Work</h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-xl">
                A selection of web platforms and systems designed with high performance, clean architecture, and responsive UX.
              </p>
            </div>

            <Link 
              to="/projects" 
              onClick={playPop}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-semibold text-xs sm:text-sm transition-colors w-fit shrink-0"
            >
              <span>View all projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {projectsData.length === 0 ? (
              <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-border dark:border-border-dark text-center text-text-muted col-span-full">
                <p className="font-semibold text-lg text-text mb-2">Projects in progress</p>
                <p className="text-sm">Visit the projects page or manage project listings via the admin dashboard.</p>
                <Link to="/projects" className="inline-block mt-4 text-sm text-primary font-medium hover:underline">
                  Go to Projects page →
                </Link>
              </div>
            ) : (
              projectsData.slice(0, 2).map((project, index) => (
                <div 
                  key={project._id || index} 
                  className="glass-panel rounded-2xl sm:rounded-3xl border border-border dark:border-border-dark p-5 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {project.tech?.slice(0, 4).map((t: string) => (
                        <span key={t} className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors text-text">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed mt-3 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border/80 dark:border-border-dark/80">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline"
                      >
                        <span>Live Preview</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-text-muted hover:text-text ml-auto"
                      >
                        <GithubIcon size={14} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* HARDWARE & FIRMWARE CODE SHOWCASE */}
        <section className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-border dark:border-border-dark">
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3">
              <SparklesIcon size={14} /> IoT & Embedded Hardware
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text">
              Bridging Web Software and the Physical World
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-text-muted mt-3 leading-relaxed">
              I specialize in end-to-end hardware-software integration. Here is a production-tested snippet connecting an ESP32 microcontroller with a real-time MQTT backend broker.
            </p>
          </div>
          
          <CodeWindow 
            filename="esp32_iot_mqtt_client.cpp"
            language="cpp"
            code={`#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "WIFI_SSID";
const char* password = "WIFI_PASSWORD";
const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("ESP32_EdgeNode")) {
      client.subscribe("sensor/temperature");
    } else {
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();
  
  // Read analog telemetry and stream via MQTT
  float temp = readSensorTemperature();
  client.publish("telemetry/temperature", String(temp).c_str());
  delay(2000);
}`}
          />
        </section>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-emerald-500/5 to-secondary/10 p-6 sm:p-10 md:p-12 text-center flex flex-col items-center">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text max-w-xl">
            Have a project in mind or looking for a talented engineer?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-lg mt-3">
            I am available for full-time opportunities, freelance contracts, and technology collaborations. Let&apos;s build something great.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <Link
              to="/contact"
              onClick={playPop}
              className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-sm shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
            >
              Get In Touch
            </Link>
            <Link
              to="/resume"
              onClick={playPop}
              className="w-full sm:w-auto px-6 py-3.5 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-text rounded-xl font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              View Interactive Resume
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};
