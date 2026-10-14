import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, Loader2, Calendar, CheckCircle2, X } from 'lucide-react';
import { apiClient as api } from '../api/client';
import { usePopSound } from '../hooks/usePopSound';

const defaultCertificates = [
  {
    title: 'Full-Stack Web Development Bootcamp',
    issuer: 'Meta & Coursera',
    date: '2024',
    link: 'https://coursera.org',
    image: '',
    description: 'Mastered frontend React, state management, REST APIs, and backend Node.js development.'
  },
  {
    title: 'IoT & Embedded Systems with ESP32',
    issuer: 'Hardware Academy',
    date: '2023',
    link: '#',
    image: '',
    description: 'Embedded programming in C++, WiFi/Bluetooth protocols, sensor interfacing, and MQTT streaming.'
  },
  {
    title: 'Computer Networks & Security Fundamentals',
    issuer: 'Cisco Networking Academy',
    date: '2023',
    link: '#',
    image: '',
    description: 'IP addressing, subnetting, switching, routing protocols, and enterprise network security practices.'
  }
];

export const Certificates: React.FC = () => {
  const [certificatesData, setCertificatesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const playPop = usePopSound();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/certificates');
        if (res.data && res.data.length > 0) {
          setCertificatesData(res.data);
        } else {
          setCertificatesData(defaultCertificates);
        }
      } catch (error) {
        console.error('Failed to fetch certificates', error);
        setCertificatesData(defaultCertificates);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 space-y-8 sm:space-y-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <Award size={16} />
          <span>Verified Credentials</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Certificates &{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Accreditations
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Industry recognized certifications, technical bootcamps, and verified learning milestones.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {certificatesData.map((cert, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="glass-panel group overflow-hidden rounded-2xl sm:rounded-3xl flex flex-col h-full border border-border dark:border-border-dark hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Visual Cover */}
            <div 
              onClick={() => { if (cert.image) { playPop(); setPreviewImage(cert.image); } }}
              className={`relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center ${cert.image ? 'cursor-pointer' : ''}`}
            >
              {cert.image ? (
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <div className="p-4 rounded-2xl bg-surface/80 dark:bg-zinc-800/80 text-primary border border-primary/20 shadow-sm">
                  <Award size={48} />
                </div>
              )}
              
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface/90 dark:bg-zinc-900/90 text-primary text-[11px] font-semibold border border-primary/20 shadow-sm">
                  <CheckCircle2 size={12} /> Verified
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                  <Calendar size={13} className="text-primary" />
                  <span>Issued {cert.date}</span>
                  <span>•</span>
                  <span className="font-medium text-text">{cert.issuer}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-text group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </h3>

                {cert.description && (
                  <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>
                )}
              </div>
              
              {cert.link && cert.link !== '#' && (
                <div className="pt-4 border-t border-border/80 dark:border-border-dark/80 mt-auto">
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={playPop}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline"
                  >
                    <span>View Credential</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full z-10 glass-panel rounded-2xl overflow-hidden p-2"
            >
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
              <img src={previewImage} alt="Certificate preview" className="w-full h-auto rounded-xl" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
