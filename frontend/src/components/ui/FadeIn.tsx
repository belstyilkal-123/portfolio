import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  amount?: number | "some" | "all";
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '',
  amount = 0.2
}) => {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        filter: 'blur(4px)'
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        filter: 'blur(0px)'
      }}
      viewport={{ once: true, amount }}
      transition={{ 
        duration: 0.7, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // custom ease-out cubic
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
