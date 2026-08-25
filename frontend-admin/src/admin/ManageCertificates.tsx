import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, Loader2, Edit3, ArrowUp, ArrowDown } from 'lucide-react';

export const ManageCertificates: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [order, setOrder] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/certificates');
      setItems((res.data || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setIssuer('');
    setDate('');
    setImage('');
    setLink('');
    setOrder(items.length);
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setTitle(item.title);
    setIssuer(item.issuer);
    setDate(item.date);
    setImage(item.image);
    setLink(item.link);
    setOrder(item.order || 0);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await api.delete(`/certificates/${id}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = { title, issuer, date, image, link, order };
      if (editingId) {
        await api.put(`/certificates/${editingId}`, payload);
      } else {
        await api.post('/certificates', payload);
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
    const tempOrder = newItems[currentIndex].order;
    newItems[currentIndex].order = newItems[targetIndex].order;
    newItems[targetIndex].order = tempOrder;
    try {
      await api.put('/certificates/reorder', { 
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
          <h1 className="text-2xl font-bold">Manage Certificates</h1>
          <p className="text-text-muted text-sm mt-1">Add, update, or remove certificates.</p>
        </div>
        <button onClick={() => { resetForm(); setIsAdding(!isAdding); }} className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 text-sm font-medium">
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add Certificate</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 mb-8 space-y-6">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Certificate' : 'Add New Certificate'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Certificate Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Issuer (Organization)</label>
              <input value={issuer} onChange={(e) => setIssuer(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Date (e.g. Aug 2024)</label>
              <input value={date} onChange={(e) => setDate(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Image URL (Cloudinary)</label>
              <input value={image} onChange={(e) => setImage(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-text-muted">Credential Link (URL)</label>
              <input value={link} onChange={(e) => setLink(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isSaving} className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : 'Save Certificate'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item._id} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-text-muted font-medium mt-1">{item.issuer} • {item.date}</p>
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
          <div className="text-center py-12 text-text-muted glass-panel rounded-2xl border border-white/10">No certificates added yet.</div>
        )}
      </div>
    </div>
  );
};
