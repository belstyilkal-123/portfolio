import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Sparkles } from '../components/ui/Sparkles';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative"
      >
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary opacity-20 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles color="#10B981">
            <span className="text-4xl font-extrabold text-text">Lost in space?</span>
          </Sparkles>
        </div>
      </motion.div>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-text-muted text-lg mt-6 max-w-md"
      >
        It looks like the page you are looking for has drifted off into the void. 
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          <Home size={18} />
          Take me home
        </Link>
      </motion.div>
    </div>
  );
};
