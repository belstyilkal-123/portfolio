import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../animations/variants';
import { useServices } from '../hooks/useContent';
import * as Icons from 'lucide-react';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePopSound } from '../hooks/usePopSound';

const defaultServices = [
  {
    _id: '1',
    title: 'Full-Stack Web Development',
    description: 'Design and end-to-end development of modern web applications using React, TypeScript, Node.js, and MongoDB with clean architecture.',
    icon: 'Code2',
    features: ['Responsive UI/UX design', 'RESTful API integration', 'State management & caching']
  },
  {
    _id: '2',
    title: 'Backend & Database Architecture',
    description: 'Building secure, scalable server-side systems, database schemas, authentication middleware, and robust API endpoints.',
    icon: 'Database',
    features: ['MongoDB & SQL data modeling', 'JWT & OAuth authentication', 'Performance & index tuning']
  },
  {
    _id: '3',
    title: 'IoT & Firmware Engineering',
    description: 'Prototyping connected edge hardware using ESP32/ESP8266 microcontrollers, sensor integration, and MQTT telemetry communication.',
    icon: 'Cpu',
    features: ['C++ Arduino/ESP-IDF firmware', 'Real-time telemetry & MQTT', 'Hardware-to-cloud bridge']
  },
  {
    _id: '4',
    title: 'Website Optimization & SEO',
    description: 'Optimizing existing web platforms for lightning-fast Core Web Vitals, mobile responsiveness, accessibility, and search engine ranking.',
    icon: 'Zap',
    features: ['Lighthouse performance scores', 'Mobile layout adjustments', 'Semantic markup & metadata']
  },
  {
    _id: '5',
    title: 'System Networking & Setup',
    description: 'Setup and configuration of local and cloud networks, server deployment, domain management, and SSL certificate installation.',
    icon: 'Network',
    features: ['DNS & routing configuration', 'Secure cloud VPS setup', 'SSL & security hardening']
  },
  {
    _id: '6',
    title: 'Code Review & Consultation',
    description: 'Evaluating codebase structure, identifying performance bottlenecks, and advising on tech stack selection for new projects.',
    icon: 'ShieldCheck',
    features: ['Architecture assessments', 'Security best practices', 'Refactoring roadmaps']
  }
];

export function Services() {
  const { data: services = [], isLoading } = useServices();
  const playPop = usePopSound();

  const activeServices = services.length > 0 ? services : defaultServices;

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8 sm:space-y-12 py-4"
    >
      <header className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <Layers size={16} />
          <span>Professional Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">Services & Expertise</h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Comprehensive software engineering solutions tailored to modern digital and embedded systems needs.
        </p>
      </header>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activeServices.map((service: any) => {
          const IconComponent = (Icons as any)[service.icon] || Icons.Code;
          const features = service.features || [
            'Clean, maintainable code',
            'Full documentation & handover',
            'Ongoing support & revision'
          ];

          return (
            <motion.div key={service._id} variants={fadeUp}>
              <div className="glass-panel h-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border dark:border-border-dark flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group">
                <div>
                  <div className="mb-4 h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-muted mt-2.5 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-border/60 dark:border-border-dark/60 space-y-2">
                    {features.map((feat: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-text-muted">
                        <CheckCircle2 size={13} className="text-primary shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/80 dark:border-border-dark/80">
                  <Link
                    to="/contact"
                    onClick={playPop}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline group-hover:gap-2 transition-all"
                  >
                    <span>Request this service</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
