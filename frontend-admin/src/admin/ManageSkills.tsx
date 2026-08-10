import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, Loader2, Edit3, ArrowUp, ArrowDown } from 'lucide-react';

export const ManageSkills: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('frontend');
  const [icon, setIcon] = useState('');
  const [proficiency, setProficiency] = useState(50);
  const [yearsOfExperience, setYearsOfExperience] = useState<number | string>(1);
  const [order, setOrder] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills((res.data || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setCategory('frontend');
    setIcon('');
    setProficiency(50);
    setYearsOfExperience(1);
    setOrder(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const payload = {
      name, category, icon, proficiency, yearsOfExperience: Number(yearsOfExperience), order
    };

    try {
      if (editingId) {
        await api.put(`/skills/${editingId}`, payload);
      } else {
        await api.post('/skills', payload);
      }
      setIsAdding(false);
      resetForm();
      fetchSkills();
    } catch (error) {
      console.error(error);
      alert('Error saving skill');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (skill: any) => {
    setEditingId(skill._id || skill.id);
    setName(skill.name || '');
    setCategory(skill.category || 'frontend');
    setIcon(skill.icon || '');
    setProficiency(skill.proficiency || 50);
    setYearsOfExperience(skill.yearsOfExperience || 1);
    setOrder(skill.order || 0);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await api.delete(`/skills/${id}`);
        fetchSkills();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const moveOrder = async (id: string, direction: 'up' | 'down') => {
    // Basic optimistic sorting, actual /api/skills/reorder might need a batch payload.
    // For simplicity, assuming backend has a route or just updating via put.
    // Following instructions: call PUT /api/skills/reorder with updated orders
    const idx = skills.findIndex(s => (s._id || s.id) === id);
    if (idx < 0) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === skills.length - 1) return;

    const newSkills = [...skills];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    
    // Swap order values
    const tempOrder = newSkills[idx].order;
    newSkills[idx].order = newSkills[swapIdx].order;
    newSkills[swapIdx].order = tempOrder;

    // re-sort local
    const ordered = [...newSkills].sort((a, b) => a.order - b.order);
    setSkills(ordered);

    try {
      await api.put('/skills/reorder', {
        skills: ordered.map(s => ({ id: s._id || s.id, order: s.order }))
      });
    } catch (error) {
      console.error('Reorder failed', error);
      fetchSkills(); // revert on failure
    }
  };

  const categories = ['frontend', 'backend', 'database', 'devops', 'tools', 'other'];
  const groupedSkills = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Skills</h1>
          <p className="text-text-muted text-sm mt-1">Organize your technical skills.</p>
        </div>
        <button onClick={() => { if (isAdding) resetForm(); setIsAdding(!isAdding); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          <Plus size={18} /> {isAdding ? 'Close' : 'Add Skill'}
        </button>
      </div>

      {isAdding && (
        <div className="glass-panel p-6 rounded-2xl mb-8 border border-white/10">
          <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Skill' : 'Create New Skill'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text">
                  {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Icon URL</label>
              <input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Proficiency (%)</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="0" max="100" value={proficiency} onChange={(e) => setProficiency(Number(e.target.value))} className="w-full" />
                  <span className="w-12 text-sm font-medium">{proficiency}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Years of Experience</label>
                <input type="number" min="0" step="0.5" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
              </div>
            </div>
            
            <div className="space-y-2">
               <label className="text-sm font-medium text-text-muted">Order</label>
               <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border dark:border-border-dark">
              <button type="button" onClick={() => { setIsAdding(false); resetForm(); }} className="px-4 py-3 rounded-xl border border-border text-text-muted hover:border-primary hover:text-text transition-all">Cancel</button>
              <button type="submit" disabled={isSaving} className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
                {isSaving ? <Loader2 className="animate-spin" size={16} /> : editingId ? 'Update Skill' : 'Save Skill'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
      ) : skills.length === 0 ? (
        <div className="glass-panel p-12 text-center text-text-muted rounded-2xl border border-border dark:border-border-dark">
          <p className="text-xl font-semibold mb-2">No skills found</p>
          <p>Add some skills to show off on your profile.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map(cat => groupedSkills[cat].length > 0 && (
            <div key={cat} className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden p-6">
              <h3 className="text-lg font-bold mb-4 capitalize">{cat}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedSkills[cat].map((skill, index) => (
                  <div key={skill._id || skill.id} className="flex items-center gap-4 p-4 border border-border dark:border-border-dark rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-zinc-800 overflow-hidden flex-shrink-0">
                      {skill.icon ? <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" /> : <div className="w-6 h-6 bg-zinc-300 dark:bg-zinc-700 rounded-full" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{skill.name}</p>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full mt-2">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${skill.proficiency}%` }} />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 border-l border-border dark:border-border-dark pl-2 ml-2">
                      <button onClick={() => moveOrder(skill._id || skill.id, 'up')} disabled={index === 0} className="text-text-muted hover:text-primary disabled:opacity-30"><ArrowUp size={14} /></button>
                      <button onClick={() => moveOrder(skill._id || skill.id, 'down')} disabled={index === groupedSkills[cat].length - 1} className="text-text-muted hover:text-primary disabled:opacity-30"><ArrowDown size={14} /></button>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-border dark:border-border-dark pl-2">
                      <button onClick={() => handleEdit(skill)} className="p-1.5 text-text-muted hover:text-primary transition-colors"><Edit3 size={14} /></button>
                      <button onClick={() => handleDelete(skill._id || skill.id)} className="p-1.5 text-red-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
