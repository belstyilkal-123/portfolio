import React from 'react';
import { motion } from 'framer-motion';
import { Download, File, ExternalLink, HardDrive, Shield, Clock } from 'lucide-react';
import { useDownloads } from '../hooks/useContent';
import * as Icons from 'lucide-react';
import { usePopSound } from '../hooks/usePopSound';

const defaultDownloads = [
  {
    _id: '1',
    name: 'Official Resume / CV',
    fileName: 'resume.pdf',
    url: '/resume.pdf',
    type: 'PDF',
    size: '180 KB',
    updatedAt: '2025',
    badge: 'Latest',
    badgeColor: 'bg-emerald-500/10 text-emerald-500',
    icon: 'FileText',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    description: 'Updated comprehensive resume detailing technical skillset, full-stack projects, and academic background.'
  },
  {
    _id: '2',
    name: 'IoT Telemetry Architecture Spec',
    fileName: 'iot_mqtt_spec.pdf',
    url: '/resume.pdf',
    type: 'PDF',
    size: '340 KB',
    updatedAt: '2024',
    badge: 'Hardware',
    badgeColor: 'bg-blue-500/10 text-blue-500',
    icon: 'Cpu',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    description: 'System documentation detailing ESP32 microcontroller firmware, MQTT broker setup, and React dashboard interfacing.'
  }
];

export const Downloads: React.FC = () => {
  const { data: downloads = [], isLoading } = useDownloads();
  const playPop = usePopSound();

  const activeDownloads = downloads.length > 0 ? downloads : defaultDownloads;

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="py-4 sm:py-8 space-y-8 sm:space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <Download size={16} />
          <span>Curated Resources & Docs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Downloads
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Downloadable resources including my official resume, architecture documentation, and project assets.
        </p>
      </motion.div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-text-muted"
      >
        {[
          { icon: Shield, text: 'Virus-free & Verified' },
          { icon: HardDrive, text: 'Current & Up-to-date' },
          { icon: Clock, text: 'Direct Instant Access' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 font-medium">
            <item.icon size={15} className="text-primary shrink-0" />
            <span>{item.text}</span>
          </div>
        ))}
      </motion.div>

      {/* Download cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        {activeDownloads.map((file: any) => {
          const IconComponent = (Icons as any)[file.icon] || Icons.FileText;
          return (
            <motion.div
              key={file._id}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border dark:border-border-dark flex flex-col justify-between gap-5 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${file.iconBg || 'bg-primary/10'} ${file.iconColor || 'text-primary'} shrink-0`}>
                  <IconComponent size={24} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-base sm:text-lg text-text">{file.name}</h3>
                    {file.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${file.badgeColor || 'bg-primary/10 text-primary'}`}>
                        {file.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{file.description}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted border-t border-border/80 dark:border-border-dark/80 pt-3.5">
                <span className="flex items-center gap-1">
                  <File size={13} />
                  {file.type || 'PDF'} · {file.size || '150 KB'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  Updated {file.updatedAt || 'Recent'}
                </span>
              </div>

              {/* Download button */}
              <div className="flex gap-2.5">
                <a
                  href={file.url}
                  download={file.fileName}
                  onClick={playPop}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all shadow-md shadow-primary/20 hover:shadow-primary/40 text-xs sm:text-sm active:scale-95"
                >
                  <Download size={15} />
                  <span>Download</span>
                </a>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playPop}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-text rounded-xl transition-all font-medium text-xs sm:text-sm border border-border dark:border-border-dark"
                  title="Preview"
                >
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
