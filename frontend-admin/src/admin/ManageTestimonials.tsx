import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, Loader2, Edit3, Star } from 'lucide-react';

export const ManageTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [isVisible, setIsVisible] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setRole('');
    setCompany('');
    setAvatarUrl('');
    setQuote('');
    setRating(5);
    setIsVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const payload = {
      name, role, company, avatarUrl, quote, rating, isVisible
    };

    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, payload);
      } else {
        await api.post('/testimonials', payload);
      }
      setIsAdding(false);
      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error(error);
      alert('Error saving testimonial');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (t: any) => {
    setEditingId(t._id || t.id);
    setName(t.name || '');
    setRole(t.role || '');
    setCompany(t.company || '');
    setAvatarUrl(t.avatarUrl || '');
    setQuote(t.quote || '');
    setRating(t.rating || 5);
    setIsVisible(t.isVisible !== false);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this testimonial?')) {
      try {
        await api.delete(`/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Testimonials</h1>
          <p className="text-text-muted text-sm mt-1">Client and peer reviews.</p>
        </div>
        <button onClick={() => { if (isAdding) resetForm(); setIsAdding(!isAdding); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          <Plus size={18} /> {isAdding ? 'Close' : 'Add Testimonial'}
        </button>
      </div>

      {isAdding && (
        <div className="glass-panel p-6 rounded-2xl mb-8 border border-white/10">
          <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Role & Company</label>
                <div className="flex gap-2">
                   <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="w-1/2 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
                   <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="w-1/2 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Avatar URL</label>
              <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Quote</label>
              <textarea value={quote} onChange={(e) => setQuote(e.target.value)} required rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text resize-y" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Rating</label>
                <div className="flex items-center gap-2 pt-2">
                  {[1,2,3,4,5].map(star => (
                    <button key={star} type="button" onClick={() => setRating(star)} className={`p-1 ${rating >= star ? 'text-yellow-400' : 'text-zinc-300 dark:text-zinc-700'}`}>
                      <Star fill={rating >= star ? 'currentColor' : 'none'} size={24} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 flex flex-col justify-center">
                 <div className="flex items-center gap-3 pt-4">
                    <input type="checkbox" id="visible" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} className="w-4 h-4 text-primary bg-zinc-100 border-zinc-300 rounded focus:ring-primary dark:bg-zinc-800 dark:border-zinc-600" />
                    <label htmlFor="visible" className="text-sm font-medium text-text-muted">Visible on portfolio</label>
                 </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border dark:border-border-dark">
              <button type="button" onClick={() => { setIsAdding(false); resetForm(); }} className="px-4 py-3 rounded-xl border border-border text-text-muted hover:border-primary hover:text-text transition-all">Cancel</button>
              <button type="submit" disabled={isSaving} className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
                {isSaving ? <Loader2 className="animate-spin" size={16} /> : editingId ? 'Update Testimonial' : 'Save Testimonial'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
      ) : testimonials.length === 0 ? (
        <div className="glass-panel p-12 text-center text-text-muted rounded-2xl border border-border dark:border-border-dark">
          <p className="text-xl font-semibold mb-2">No testimonials yet</p>
          <p>Add some kind words from your colleagues.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t._id || t.id} className={`glass-panel p-6 rounded-2xl border ${t.isVisible ? 'border-border dark:border-border-dark' : 'border-dashed border-zinc-300 dark:border-zinc-700 opacity-70'} flex flex-col`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-xs text-text-muted">{t.role} {t.company && `@ ${t.company}`}</p>
                  </div>
                </div>
                {!t.isVisible && <span className="text-[10px] uppercase font-bold px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded">Hidden</span>}
              </div>
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(star => (
                   <Star key={star} size={14} fill={t.rating >= star ? '#facc15' : 'none'} className={t.rating >= star ? 'text-yellow-400' : 'text-zinc-300'} />
                ))}
              </div>
              <p className="text-sm flex-1 text-text-muted italic mb-6">"{t.quote.length > 120 ? t.quote.substring(0, 120) + '...' : t.quote}"</p>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-border dark:border-border-dark">
                <button onClick={() => handleEdit(t)} className="p-2 text-text-muted hover:text-primary transition-colors bg-zinc-100 dark:bg-zinc-800 rounded-lg"><Edit3 size={16} /></button>
                <button onClick={() => handleDelete(t._id || t.id)} className="p-2 text-red-400 hover:text-red-500 transition-colors bg-red-50 dark:bg-red-900/20 rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
