import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { apiClient as api } from '../api/client';
import { CodeWindow } from '../components/ui/CodeWindow';
import { LikeButton } from '../components/ui/LikeButton';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/blog/${slug}`);
        setPost(res.data);
      } catch (error) {
        console.error('Failed to fetch blog post', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-primary hover:underline">Return to blog</Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto py-8"
    >
      <Link to="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 font-medium">
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {post.categories?.map((cat: string) => (
            <span key={cat} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              {cat}
            </span>
          ))}
          <span className="text-sm text-text-muted flex items-center gap-1">
            <Calendar size={14} /> 
            {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-sm text-text-muted flex items-center gap-1">
            <Clock size={14} /> 
            {post.readingTime || 5} min read
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">{post.title}</h1>
        {post.excerpt && (
          <p className="text-xl text-text-muted leading-relaxed font-medium">
            {post.excerpt}
          </p>
        )}
      </header>

      {post.coverImage && (
        <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-black/20">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark prose-img:rounded-2xl">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            code({ _node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              
              if (!inline && match) {
                return (
                  <CodeWindow 
                    code={String(children).replace(/\n$/, '')} 
                    language={match[1]} 
                  />
                );
              }
              return (
                <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-primary font-mono text-sm" {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <hr className="my-12 border-border dark:border-border-dark" />
      
      <LikeButton slug={post.slug} />

    </motion.article>
  );
};
