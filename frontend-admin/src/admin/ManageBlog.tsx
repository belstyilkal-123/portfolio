import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, Loader2, Edit3 } from 'lucide-react';

export const ManageBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/blog');
      setBlogs(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCoverImage('');
    setTags('');
    setIsPublished(false);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const payload = {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      isPublished
    };

    try {
      if (editingId) {
        await api.put(`/blog/${editingId}`, payload);
      } else {
        await api.post('/blog', payload);
      }
      setIsAdding(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error(error);
      alert('Error saving blog post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (blog: any) => {
    setEditingId(blog._id || blog.id);
    setTitle(blog.title || '');
    setSlug(blog.slug || '');
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    setCoverImage(blog.coverImage || '');
    setTags((blog.tags || []).join(', '));
    setIsPublished(!!blog.isPublished);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await api.delete(`/blog/${id}`);
        fetchBlogs();
      } catch (error) {
        console.error(error);
        alert('Error deleting post');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Blog</h1>
          <p className="text-text-muted text-sm mt-1">Create and edit blog posts.</p>
        </div>
        <button onClick={() => { if (isAdding) resetForm(); setIsAdding(!isAdding); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          <Plus size={18} /> {isAdding ? 'Close' : 'Add Post'}
        </button>
      </div>

      {isAdding && (
        <div className="glass-panel p-6 rounded-2xl mb-8 border border-white/10">
          <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Post' : 'Create New Post'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Title</label>
                <input value={title} onChange={(e) => handleTitleChange(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Slug</label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows={2} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text resize-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Content (Markdown/HTML)</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={8} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text resize-y" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Cover Image URL</label>
                <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Tags (comma-separated)</label>
                <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input type="checkbox" id="publish" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 text-primary bg-zinc-100 border-zinc-300 rounded focus:ring-primary dark:bg-zinc-800 dark:border-zinc-600" />
              <label htmlFor="publish" className="text-sm font-medium text-text-muted">Publish this post</label>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border dark:border-border-dark">
              <button type="button" onClick={() => { setIsAdding(false); resetForm(); }} className="px-4 py-3 rounded-xl border border-border text-text-muted hover:border-primary hover:text-text transition-all">Cancel</button>
              <button type="submit" disabled={isSaving} className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
                {isSaving ? <Loader2 className="animate-spin" size={16} /> : editingId ? 'Update Post' : 'Save Post'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
      ) : blogs.length === 0 ? (
        <div className="glass-panel p-12 text-center text-text-muted rounded-2xl border border-border dark:border-border-dark">
          <p className="text-xl font-semibold mb-2">No posts found</p>
          <p>Write your first blog post.</p>
        </div>
      ) : (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-border dark:border-border-dark">
                <th className="p-4 font-semibold text-sm">Title</th>
                <th className="p-4 font-semibold text-sm">Status</th>
                <th className="p-4 font-semibold text-sm">Created Date</th>
                <th className="p-4 font-semibold text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog: any) => (
                <tr key={blog._id || blog.id} className="border-b border-border dark:border-border-dark hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4 font-medium">{blog.title}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${blog.isPublished ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-500/10 text-zinc-500'}`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-text-muted">{new Date(blog.createdAt || Date.now()).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => handleEdit(blog)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-text-muted hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"><Edit3 size={16} /> Edit</button>
                      <button onClick={() => handleDelete(blog._id || blog.id)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors"><Trash2 size={16} /> Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
