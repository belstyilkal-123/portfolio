import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ArrowRight, Loader2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient as api } from '../api/client';
import { FadeIn } from '../components/ui/FadeIn';
import { usePopSound } from '../hooks/usePopSound';

const defaultPosts = [
  {
    _id: '1',
    slug: 'bridging-esp32-with-nodejs-mqtt',
    title: 'Bridging ESP32 Microcontrollers with Node.js via MQTT',
    excerpt: 'A comprehensive guide on establishing two-way telemetry streams between embedded edge microcontrollers and Node.js backend services.',
    tags: ['IoT', 'Node.js', 'ESP32'],
    publishedDate: '2025-01-15',
    readingTime: 6
  },
  {
    _id: '2',
    slug: 'building-production-mern-stack-architecture',
    title: 'Architecture Patterns for Production-Ready MERN Applications',
    excerpt: 'Key design patterns, middleware best practices, and MongoDB schema design techniques for scalable full-stack applications.',
    tags: ['Full-Stack', 'React', 'MongoDB'],
    publishedDate: '2024-11-20',
    readingTime: 8
  },
  {
    _id: '3',
    slug: 'why-typescript-is-essential-for-modern-web',
    title: 'Why TypeScript is Essential for Robust Full-Stack Engineering',
    excerpt: 'Exploring type safety, developer productivity, and eliminating entire categories of runtime bugs in modern web codebases.',
    tags: ['TypeScript', 'JavaScript'],
    publishedDate: '2024-09-10',
    readingTime: 5
  }
];

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const playPop = usePopSound();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blog?status=published');
        if (res.data && res.data.length > 0) {
          setPosts(res.data);
        } else {
          setPosts(defaultPosts);
        }
      } catch (error) {
        console.error('Failed to fetch blogs', error);
        setPosts(defaultPosts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
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
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <BookOpen size={16} />
          <span>Engineering Articles & Insights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Blog &{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Articles
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Deep-dives into software development, embedded systems, networking, and modern engineering practices.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post, idx) => (
          <FadeIn key={post._id || idx} delay={0.08 * idx}>
            <Link 
              to={`/blog/${post.slug}`}
              onClick={playPop}
              className="block glass-panel rounded-2xl sm:rounded-3xl overflow-hidden group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-border dark:border-border-dark h-full flex flex-col justify-between"
            >
              <div className="p-5 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 bg-primary/10 text-primary rounded-full">
                      {(post.tags && post.tags.length > 0) ? post.tags[0] : 'Article'}
                    </span>
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <Calendar size={12} /> {new Date(post.publishedDate || post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-text line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/80 dark:border-border-dark/80 mt-auto">
                  <span className="text-xs font-semibold flex items-center gap-1.5 text-text-muted">
                    <Clock size={14} className="text-primary" /> {post.readingTime || 5} min read
                  </span>
                  
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-1.5 transition-all">
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
