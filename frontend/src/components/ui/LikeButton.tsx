import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { usePopSound } from '../../hooks/usePopSound';

// Particle helper
const random = (min: number, max: number) => Math.random() * (max - min) + min;

const Particle = ({ x, y, color, onComplete }: any) => {
  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{ 
        x, 
        y, 
        scale: 0, 
        opacity: 0 
      }}
      transition={{ duration: random(0.5, 0.8), ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ backgroundColor: color }}
    />
  );
};

export const LikeButton: React.FC<{ slug?: string }> = ({ slug = 'general' }) => {
  const [likes, setLikes] = useState(0);
  const [particles, setParticles] = useState<any[]>([]);
  const playPop = usePopSound();

  // Load from local storage for demo purposes
  useEffect(() => {
    const saved = localStorage.getItem(`likes-${slug}`);
    if (saved) setLikes(parseInt(saved, 10));
    else setLikes(Math.floor(Math.random() * 50) + 10); // fake initial likes
  }, [slug]);

  const handleLike = () => {
    playPop();
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${slug}`, newLikes.toString());

    // Generate 8-12 particles
    const newParticles = Array.from({ length: Math.floor(random(8, 12)) }).map(() => ({
      id: Math.random().toString(),
      x: random(-60, 60),
      y: random(-60, -20), // Mostly upwards
      color: ['#10B981', '#3B82F6', '#F43F5E', '#F59E0B'][Math.floor(Math.random() * 4)]
    }));

    setParticles(prev => [...prev, ...newParticles]);
  };

  const removeParticle = (id: string) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="flex flex-col items-center gap-3 my-12">
      <p className="text-sm font-bold uppercase tracking-widest text-text-muted">
        Enjoyed this?
      </p>
      
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-surface dark:bg-surface-dark border-2 border-border dark:border-border-dark shadow-xl hover:border-primary hover:text-primary text-text-muted transition-colors group"
        >
          <Heart 
            size={24} 
            className="group-hover:fill-primary/20 transition-all duration-300"
          />
        </motion.button>

        {/* Particles */}
        {particles.map(p => (
          <Particle 
            key={p.id} 
            x={p.x} 
            y={p.y} 
            color={p.color} 
            onComplete={() => removeParticle(p.id)} 
          />
        ))}

        {/* Floating Numbers */}
        <AnimatePresence>
          {particles.map(p => (
            <motion.div
              key={`num-${p.id}`}
              initial={{ opacity: 1, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -40, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 text-primary font-bold text-sm pointer-events-none"
            >
              +1
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="text-sm font-mono text-text-muted bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
        {likes.toLocaleString()} likes
      </div>
    </div>
  );
};
