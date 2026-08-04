import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, File, Image, Code2, ExternalLink, HardDrive, Shield, Clock } from 'lucide-react';

const downloads = [
  {
    id: 1,
    name: 'Resume / CV',
    description: 'My latest professional resume including skills, experience, and education. Updated August 2025.',
    size: '245 KB',
    type: 'PDF',
    icon: FileText,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-500/10',
    badge: 'Most Popular',
    badgeColor: 'bg-primary/10 text-primary',
    url: '/resume.pdf',
    fileName: 'Belstie_Yilkal_Resume.pdf',
    updatedAt: 'Aug 2025'
  },
  {
    id: 2,
    name: 'Portfolio Brief',
    description: 'A concise 1-page overview of my top projects and key achievements, ideal for quick reference.',
    size: '180 KB',
    type: 'PDF',
    icon: File,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
    badge: 'New',
    badgeColor: 'bg-blue-500/10 text-blue-500',
    url: '#',
    fileName: 'Belstie_Yilkal_Portfolio_Brief.pdf',
    updatedAt: 'Jul 2025'
  },
  {
    id: 3,
    name: 'Project Showcase',
    description: 'Detailed case studies for the Smart Irrigation System, EthioSearch Engine, and Stadium Manager.',
    size: '1.2 MB',
    type: 'PDF',
    icon: Code2,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-500/10',
    badge: null,
    badgeColor: '',
    url: '#',
    fileName: 'Belstie_Yilkal_Projects.pdf',
    updatedAt: 'Jun 2025'
  },
  {
    id: 4,
    name: 'Profile Photo (High-Res)',
    description: 'High-resolution professional profile photo for media kits, publications, or events.',
    size: '3.4 MB',
    type: 'PNG',
    icon: Image,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
    badge: null,
    badgeColor: '',
    url: '#',
    fileName: 'Belstie_Yilkal_Photo.png',
    updatedAt: 'Mar 2025'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Downloads: React.FC = () => {
  return (
    <div className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 text-sm font-medium">
          <Download size={16} />
          Resources
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Downloads
          </span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto text-lg">
          Downloadable resources including my resume, project case studies, and media assets.
        </p>
      </motion.div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-8 mb-12 text-sm text-text-muted"
      >
        {[
          { icon: Shield, text: 'Virus-free & Safe' },
          { icon: HardDrive, text: 'Always Up-to-date' },
          { icon: Clock, text: 'Instant Download' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <item.icon size={16} className="text-primary" />
            {item.text}
          </div>
        ))}
      </motion.div>

      {/* Download cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
      >
        {downloads.map((file) => (
          <motion.div
            key={file.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="glass-panel rounded-3xl p-7 border border-border dark:border-zinc-800/80 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col gap-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-2xl ${file.iconBg} ${file.iconColor} shrink-0`}>
                  <file.icon size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-xl text-text">{file.name}</h3>
                    {file.badge && (
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${file.badgeColor}`}>
                        {file.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">{file.description}</p>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-text-muted border-t border-border dark:border-border-dark pt-4">
              <span className="flex items-center gap-1.5">
                <File size={13} />
                {file.type} · {file.size}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                Updated {file.updatedAt}
              </span>
              <span className="font-mono text-xs opacity-70 truncate">{file.fileName}</span>
            </div>

            {/* Download button */}
            <div className="flex gap-3">
              <a
                href={file.url}
                download={file.fileName}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 text-sm"
              >
                <Download size={16} />
                Download
              </a>
              <a
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-text rounded-xl transition-all font-medium text-sm border border-border dark:border-zinc-700"
                title="Preview"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center text-text-muted text-sm"
      >
        All files are regularly updated. If you need a specific resource not listed here, feel free to{' '}
        <a href="/contact" className="text-primary hover:underline font-medium">contact me</a>.
      </motion.div>
    </div>
  );
};
