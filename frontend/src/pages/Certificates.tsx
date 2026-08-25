import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Loader2 } from 'lucide-react';
import api from '../api/client';

export const Certificates: React.FC = () => {
  const [certificatesData, setCertificatesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/certificates');
        setCertificatesData(res.data || []);
      } catch (error) {
        console.error('Failed to fetch certificates', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Certificates</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        <p className="text-text-muted mt-6 max-w-2xl mx-auto">
          Professional certifications and achievements that validate my skills.
        </p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificatesData.map((cert, idx) => (
          <motion.div key={idx} variants={itemVariants} className="glass-panel group overflow-hidden rounded-2xl flex flex-col h-full border border-white/10 hover:border-primary/50 transition-colors">
            <div className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <Award size={64} className="text-zinc-300 dark:text-zinc-600" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-primary mb-2">{cert.date}</span>
              <h3 className="text-xl font-bold mb-1 line-clamp-2">{cert.title}</h3>
              <p className="text-text-muted text-sm mb-4">{cert.issuer}</p>
              
              <div className="mt-auto pt-4 border-t border-border dark:border-border-dark">
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-text hover:text-primary transition-colors">
                  View Credential <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {certificatesData.length === 0 && (
        <div className="text-center py-12 text-text-muted">No certificates available.</div>
      )}
    </div>
  );
};
