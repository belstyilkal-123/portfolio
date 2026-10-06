import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const generateSparkle = (color = '#FFC700') => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      zIndex: 2,
    },
  };
};

const Sparkle: React.FC<{ color: string; size: number; style: any }> = ({ color, size, style }) => {
  return (
    <motion.span
      className="absolute pointer-events-none"
      style={style}
      initial={{ scale: 0, opacity: 0, rotate: 0 }}
      animate={{ scale: 1, opacity: 1, rotate: 180 }}
      exit={{ scale: 0, opacity: 0, rotate: 360 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          fill={color}
        />
      </svg>
    </motion.span>
  );
};

export const Sparkles: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = '#10B981' }) => {
  const [sparkles, setSparkles] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      setSparkles(currentSparkles => {
        const nextSparkles = currentSparkles.filter(sp => {
          const delta = now - sp.createdAt;
          return delta < 750;
        });
        nextSparkles.push(sparkle);
        return nextSparkles;
      });
    }, 250); // frequency of sparkles

    return () => clearInterval(interval);
  }, [color]);

  return (
    <span className="relative inline-block">
      {sparkles.map(sparkle => (
        <Sparkle key={sparkle.id} color={sparkle.color} size={sparkle.size} style={sparkle.style} />
      ))}
      <span className="relative z-1">{children}</span>
    </span>
  );
};
