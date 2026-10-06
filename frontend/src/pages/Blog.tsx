import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient as api } from '../api/client';
import { FadeIn } from '../components/ui/FadeIn';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blog?status=published');
        setPosts(res.data || []);
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

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
          <FadeIn key={post._id || idx} delay={0.1}>
            <Link 
              to={`/blog/${post.slug}`}
              className="block glass-panel rounded-3xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-border dark:border-zinc-800/80 h-full"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {(post.tags && post.tags.length > 0) ? post.tags[0] : (post.categories && post.categories.length > 0 ? post.categories[0] : 'Article')}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Calendar size={12} /> {new Date(post.publishedDate || post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
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
                    <BookOpen size={16} /> {post.readingTime || 5} min read
                  </span>
                  <button className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          No published articles yet. Check back soon!
        </div>
      )}
    </div>
  );
};
