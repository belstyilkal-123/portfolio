import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFAQs } from '../hooks/useContent';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { usePopSound } from '../hooks/usePopSound';

const defaultFAQs = [
  {
    _id: '1',
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in full-stack web platforms using React, TypeScript, Node.js, Express, and MongoDB. In addition, I have hands-on experience programming embedded IoT microcontrollers with C++ and ESP32.'
  },
  {
    _id: '2',
    question: 'Are you available for full-time roles or freelance contracts?',
    answer: 'Yes! I am actively looking for full-time software engineering roles (remote, hybrid, or on-site) as well as freelance contract projects.'
  },
  {
    _id: '3',
    question: 'Can you work across different timezones?',
    answer: 'Absolutely. I am based in Bahir Dar, Ethiopia (GMT+3), and have flexible working hours to overlap comfortably with teams in Europe, the Americas, and Asia.'
  },
  {
    _id: '4',
    question: 'How do you handle project communication and updates?',
    answer: 'I believe in transparent, proactive communication. I provide frequent milestone updates, clear pull requests on GitHub, and am always reachable via Telegram, Email, and Slack.'
  },
  {
    _id: '5',
    question: 'Do you design the user interfaces yourself?',
    answer: 'Yes, I design clean, modern, and accessible user interfaces using Tailwind CSS and Framer Motion, with strong attention to mobile responsiveness and touch interactions.'
  }
];

export function FAQ() {
  const { data: faqs = [], isLoading } = useFAQs();
  const playPop = usePopSound();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const activeFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  const toggleFAQ = (index: number) => {
    playPop();
    setOpenIdx(openIdx === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8 max-w-3xl mx-auto space-y-8 sm:space-y-12">
      {/* Header */}
      <header className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <HelpCircle size={16} />
          <span>Common Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Frequently Asked{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Quick answers to common inquiries regarding my skillset, availability, and development process.
        </p>
      </header>

      {/* Accordion list */}
      <div className="space-y-3 sm:space-y-4">
        {activeFAQs.map((faq: any, idx: number) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={faq._id || idx}
              className="glass-panel rounded-2xl sm:rounded-3xl border border-border dark:border-border-dark overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left gap-4 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-text">
                  {faq.question}
                </span>
                <span className={`p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-text-muted transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
                  <ChevronDown size={16} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border/40 dark:border-border-dark/40">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
