import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, Loader2, Edit3, ArrowUp, ArrowDown } from 'lucide-react';

export const ManageExperience: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [timeline, setTimeline] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Briefcase');
  const [order, setOrder] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/experience');
      setItems((res.data || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setRole('');
    setCompany('');
    setTimeline('');
    setDescription('');
    setIcon('Briefcase');
    setOrder(items.length);
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setRole(item.role);
    setCompany(item.company);
    setTimeline(item.timeline);
    setDescription(item.description);
    setIcon(item.icon || 'Briefcase');
    setOrder(item.order || 0);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    try {
      await api.delete(`/experience/${id}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = { role, company, timeline, description, icon, order };
      if (editingId) {
        await api.put(`/experience/${editingId}`, payload);
      } else {
        await api.post('/experience', payload);
      }
      setIsAdding(false);
      resetForm();
      fetchItems();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = items.findIndex(i => i._id === id);
    if ((direction === 'up' && currentIndex === 0) || (direction === 'down' && currentIndex === items.length - 1)) return;

    const newItems = [...items];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Swap order values
    const tempOrder = newItems[currentIndex].order;
    newItems[currentIndex].order = newItems[targetIndex].order;
    newItems[targetIndex].order = tempOrder;

    // Save changes
    try {
      await api.put('/experience/reorder', { 
        items: [
          { id: newItems[currentIndex]._id, order: newItems[currentIndex].order },
          { id: newItems[targetIndex]._id, order: newItems[targetIndex].order }
        ]
      });
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Experience</h1>
          <p className="text-text-muted text-sm mt-1">Add, update, or remove work experience.</p>
        </div>
        <button onClick={() => { resetForm(); setIsAdding(!isAdding); }} className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 text-sm font-medium">
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add Experience</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 mb-8 space-y-6">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Experience' : 'Add New Experience'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Role / Position</label>
              <input value={role} onChange={(e) => setRole(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Company</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Timeline (e.g. 2021 - Present)</label>
              <input value={timeline} onChange={(e) => setTimeline(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Icon (Lucide name)</label>
              <input value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text resize-y" />
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isSaving} className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : 'Save Experience'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item._id} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">{item.role} <span className="text-text-muted font-normal text-sm ml-2">{item.company}</span></h3>
              <p className="text-sm text-primary font-medium mt-1">{item.timeline}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleReorder(item._id, 'up')} disabled={index === 0} className="p-2 text-zinc-400 hover:text-primary disabled:opacity-30"><ArrowUp size={18} /></button>
              <button onClick={() => handleReorder(item._id, 'down')} disabled={index === items.length - 1} className="p-2 text-zinc-400 hover:text-primary disabled:opacity-30"><ArrowDown size={18} /></button>
              <div className="w-px h-6 bg-border dark:bg-border-dark mx-2"></div>
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"><Edit3 size={18} /></button>
              <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && !isAdding && (
          <div className="text-center py-12 text-text-muted glass-panel rounded-2xl border border-white/10">No experience added yet.</div>
        )}
      </div>
    </div>
  );
};
