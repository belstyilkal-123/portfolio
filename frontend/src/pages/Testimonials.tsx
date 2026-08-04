import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, MessageSquare, ThumbsUp } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Amare Tadesse',
    role: 'Lecturer, Bahir Dar University',
    avatar: '👨‍🏫',
    rating: 5,
    text: 'Belstie consistently demonstrated exceptional problem-solving skills and a deep understanding of software systems. His Smart Irrigation project was one of the most technically impressive capstone works I\'ve supervised.',
    tag: 'Academic'
  },
  {
    id: 2,
    name: 'Mekdes Alemu',
    role: 'Senior Network Engineer, IT Firm Bahir Dar',
    avatar: '👩‍💻',
    rating: 5,
    text: 'During his internship, Belstie showed remarkable initiative. He picked up Cisco networking concepts quickly and actively contributed to infrastructure troubleshooting far beyond what we\'d expect from an intern.',
    tag: 'Professional'
  },
  {
    id: 3,
    name: 'Yohannes Bekele',
    role: 'Team Lead, Collaborative Project',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Working with Belstie on the Stadium Management System was a great experience. He took ownership of the database layer and delivered clean, well-documented stored procedures that exceeded our requirements.',
    tag: 'Collaboration'
  },
  {
    id: 4,
    name: 'Hana Girma',
    role: 'Classmate & Project Partner',
    avatar: '👩‍🎓',
    rating: 5,
    text: 'Belstie is always willing to help teammates understand complex concepts. His patience and communication skills make him not just a great developer, but a great team player.',
    tag: 'Teamwork'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-300 dark:text-zinc-600'}
      />
    ))}
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <div className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-6 text-sm font-medium">
          <MessageSquare size={16} />
          What People Say
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Testimonials
          </span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto text-lg">
          Feedback from lecturers, colleagues, and collaborators who have worked with me on projects and internships.
        </p>
      </motion.div>

      {/* Summary bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-center gap-8 max-w-2xl mx-auto"
      >
        <div className="text-center">
          <p className="text-5xl font-extrabold text-text mb-1">5.0</p>
          <StarRating rating={5} />
          <p className="text-sm text-text-muted mt-1">Average Rating</p>
        </div>
        <div className="w-px h-16 bg-border dark:bg-border-dark hidden sm:block" />
        <div className="text-center">
          <p className="text-5xl font-extrabold text-text mb-1">{testimonials.length}</p>
          <div className="flex justify-center mt-1">
            <ThumbsUp size={18} className="text-primary" />
          </div>
          <p className="text-sm text-text-muted mt-1">Total Reviews</p>
        </div>
        <div className="w-px h-16 bg-border dark:bg-border-dark hidden sm:block" />
        <div className="text-center">
          <p className="text-5xl font-extrabold text-text mb-1">100%</p>
          <div className="flex justify-center mt-1">
            <Star size={18} className="text-amber-400 fill-amber-400" />
          </div>
          <p className="text-sm text-text-muted mt-1">5-Star Reviews</p>
        </div>
      </motion.div>

      {/* Testimonial cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="glass-panel rounded-3xl p-8 border border-border dark:border-zinc-800/80 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col gap-6"
          >
            {/* Quote icon */}
            <div className="flex items-start justify-between">
              <Quote size={36} className="text-primary/30 shrink-0" />
              <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">
                {t.tag}
              </span>
            </div>

            {/* Text */}
            <p className="text-text-muted leading-relaxed text-base italic flex-1">
              "{t.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pt-4 border-t border-border dark:border-border-dark">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl shrink-0 border border-border dark:border-border-dark">
                {t.avatar}
              </div>
              <div className="flex-1">
                <p className="font-bold text-text">{t.name}</p>
                <p className="text-sm text-text-muted">{t.role}</p>
              </div>
              <StarRating rating={t.rating} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <p className="text-text-muted text-sm mb-4">Have you worked with me? I'd love to hear your feedback.</p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all font-medium shadow-lg shadow-primary/20 hover:-translate-y-0.5"
        >
          <MessageSquare size={18} />
          Leave a Testimonial
        </a>
      </motion.div>
    </div>
  );
};
