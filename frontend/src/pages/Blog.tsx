import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export const Blog: React.FC = () => {
  const posts = [
    {
      title: "Building a Smart Irrigation System with ESP32",
      excerpt: "Learn how I combined React, Node.js, and an ESP32 microcontroller to build an automated, IoT-based agriculture solution.",
      date: "Oct 12, 2024",
      readTime: "5 min read",
      category: "IoT & Hardware"
    },
    {
      title: "Mastering Stored Procedures in MySQL",
      excerpt: "A deep dive into database triggers, stored procedures, and how I used them to optimize the Stadium Management System.",
      date: "Aug 24, 2024",
      readTime: "7 min read",
      category: "Databases"
    },
    {
      title: "My Experience as a Networking Intern",
      excerpt: "Insights, challenges, and lessons learned from configuring Cisco routers and securing local area networks in a real-world environment.",
      date: "Jun 05, 2024",
      readTime: "4 min read",
      category: "Career"
    }
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
          Blog & Articles
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          Thoughts on software engineering, IoT, networking, and my journey as an IT student.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-border dark:border-zinc-800/80 flex flex-col h-full"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Calendar size={12} /> {post.date}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              
              <p className="text-text-muted mb-8 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border dark:border-border-dark mt-auto">
                <span className="text-sm font-medium flex items-center gap-2 text-text-muted">
                  <BookOpen size={16} /> {post.readTime}
                </span>
                <button className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
