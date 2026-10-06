import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, Loader2, Edit3 } from 'lucide-react';

type Tab = 'achievements' | 'faqs' | 'services' | 'timelines' | 'galleries' | 'downloads' | 'statistics';

export const ManageContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('achievements');
  
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/${activeTab}`);
      setItems((res.data || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ order: items.length });
    setIsAdding(false);
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setForm({ ...item });
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete this item?`)) return;
    try {
      await api.delete(`/${activeTab}/${id}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        await api.put(`/${activeTab}/${editingId}`, form);
      } else {
        await api.post(`/${activeTab}`, form);
      }
      resetForm();
      fetchItems();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    resetForm();
  };

  const renderFormFields = () => {
    if (activeTab === 'achievements') {
      return (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Title</label>
            <input value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Category</label>
            <input value={form.category || ''} onChange={e => setForm({...form, category: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Icon (Emoji)</label>
            <input value={form.icon || ''} onChange={e => setForm({...form, icon: e.target.value})} placeholder="e.g. 🏆" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Year</label>
            <input value={form.year || ''} onChange={e => setForm({...form, year: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-text-muted">Description</label>
            <textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} required rows={3} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
        </>
      );
    }
    if (activeTab === 'faqs') {
      return (
        <>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-text-muted">Question</label>
            <input value={form.question || ''} onChange={e => setForm({...form, question: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-text-muted">Answer</label>
            <textarea value={form.answer || ''} onChange={e => setForm({...form, answer: e.target.value})} required rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
        </>
      );
    }
    if (activeTab === 'services') {
      return (
        <>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-text-muted">Service Title</label>
            <input value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-text-muted">Description</label>
            <textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} required rows={4} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Icon Name (Lucide React)</label>
            <input value={form.icon || ''} onChange={e => setForm({...form, icon: e.target.value})} placeholder="e.g. Code, Monitor, Server" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
        </>
      );
    }
    if (activeTab === 'timelines') {
      return (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Year</label>
            <input value={form.year || ''} onChange={e => setForm({...form, year: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Title</label>
            <input value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Company/Organization</label>
            <input value={form.company || ''} onChange={e => setForm({...form, company: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Icon Name (Lucide)</label>
            <input value={form.icon || ''} onChange={e => setForm({...form, icon: e.target.value})} placeholder="Briefcase, GraduationCap..." className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Color Class</label>
            <input value={form.color || ''} onChange={e => setForm({...form, color: e.target.value})} placeholder="bg-primary" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-text-muted">Description</label>
            <textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} required rows={3} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
        </>
      );
    }
    if (activeTab === 'galleries') {
      return (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Title</label>
            <input value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-text-muted">Image URL (src)</label>
            <input value={form.src || ''} onChange={e => setForm({...form, src: e.target.value})} required placeholder="https://..." className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
        </>
      );
    }
    if (activeTab === 'downloads') {
      return (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Name</label>
            <input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Type (e.g. PDF, PNG)</label>
            <input value={form.type || ''} onChange={e => setForm({...form, type: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Size (e.g. 2.4 MB)</label>
            <input value={form.size || ''} onChange={e => setForm({...form, size: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Badge (Optional)</label>
            <input value={form.badge || ''} onChange={e => setForm({...form, badge: e.target.value})} placeholder="e.g. NEW" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-text-muted">Description</label>
            <input value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-text-muted">File URL</label>
            <input value={form.url || ''} onChange={e => setForm({...form, url: e.target.value})} required placeholder="https://..." className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">File Name (for download)</label>
            <input value={form.fileName || ''} onChange={e => setForm({...form, fileName: e.target.value})} required placeholder="file.pdf" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Updated At</label>
            <input value={form.updatedAt || ''} onChange={e => setForm({...form, updatedAt: e.target.value})} required placeholder="Oct 2024" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Icon Name</label>
            <input value={form.icon || ''} onChange={e => setForm({...form, icon: e.target.value})} placeholder="FileText" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
        </>
      );
    }
    if (activeTab === 'statistics') {
      return (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Label (e.g. Projects Built)</label>
            <input value={form.label || ''} onChange={e => setForm({...form, label: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Value (e.g. 10+)</label>
            <input value={form.value || ''} onChange={e => setForm({...form, value: e.target.value})} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Icon Name (Lucide)</label>
            <input value={form.icon || ''} onChange={e => setForm({...form, icon: e.target.value})} placeholder="Code2" className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-text" />
          </div>
        </>
      );
    }
  };

  const renderItemTitle = (item: any) => {
    if (activeTab === 'achievements') return <>{item.icon} {item.title}</>;
    if (activeTab === 'faqs') return item.question;
    if (activeTab === 'services') return item.title;
    if (activeTab === 'timelines') return `${item.year} - ${item.title}`;
    if (activeTab === 'galleries') return item.title;
    if (activeTab === 'downloads') return item.name;
    if (activeTab === 'statistics') return `${item.label} (${item.value})`;
    return '';
  };

  const tabs: { id: Tab, label: string }[] = [
    { id: 'achievements', label: 'Achievements' },
    { id: 'faqs', label: 'FAQ' },
    { id: 'services', label: 'Services' },
    { id: 'timelines', label: 'Timeline' },
    { id: 'galleries', label: 'Gallery' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'statistics', label: 'Stats' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Content</h1>
          <p className="text-text-muted text-sm mt-1">Manage static sections of your portfolio.</p>
        </div>
        <button onClick={() => { isAdding ? resetForm() : setIsAdding(true); }} className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 text-sm font-medium">
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add New</>}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-zinc-100 dark:bg-zinc-800/50 text-text hover:bg-zinc-200 dark:hover:bg-zinc-700/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 mb-8 space-y-6">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderFormFields()}
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" disabled={isSaving} className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : 'Save'}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold">{renderItemTitle(item)}</h3>
                {activeTab === 'achievements' && <p className="text-sm text-text-muted mt-1">{item.category}</p>}
                {activeTab === 'services' && <p className="text-sm text-text-muted mt-1 truncate max-w-sm">{item.description}</p>}
                {activeTab === 'timelines' && <p className="text-sm text-text-muted mt-1 truncate max-w-sm">{item.company}</p>}
                {activeTab === 'galleries' && <img src={item.src} alt={item.title} className="h-12 w-12 object-cover rounded mt-2" />}
                {activeTab === 'downloads' && <p className="text-sm text-text-muted mt-1">{item.type} - {item.size}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"><Edit3 size={18} /></button>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && !isAdding && (
            <div className="text-center py-12 text-text-muted glass-panel rounded-2xl border border-white/10">No items found.</div>
          )}
        </div>
      )}
    </div>
  );
};
