import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader2, Save, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultStrengths = [
  'Full-stack development with React and Node.js',
  'Database design for MongoDB and MySQL',
  'Hands-on experience with IoT and ESP32 development',
  'Clear communication and reliable delivery'
];

const defaultFocusAreas = [
  { icon: 'Code2', title: 'Web Applications', detail: 'Modern, responsive interfaces built with best practices.' },
  { icon: 'Database', title: 'Backend & Databases', detail: 'Secure APIs and data models designed for scaling.' },
  { icon: 'Network', title: 'Networking', detail: 'Core network configuration and systems connectivity.' },
  { icon: 'Cpu', title: 'IoT Solutions', detail: 'Embedded systems with real-time monitoring and automation.' }
];

export const ManageAbout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const [strengths, setStrengths] = useState<string[]>([]);
  const [focusAreas, setFocusAreas] = useState<Array<{icon: string, title: string, detail: string}>>([]);
  const [aboutHeading, setAboutHeading] = useState('Building systems with clarity and impact');
  
  const [newStrength, setNewStrength] = useState('');
  
  const [newFocusArea, setNewFocusArea] = useState({ icon: 'Code2', title: '', detail: '' });
  const [editingFocusIndex, setEditingFocusIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      const settingsMap: Record<string, string> = {};
      res.data.forEach((s: { key: string; value: string }) => {
        settingsMap[s.key] = s.value;
      });

      if (settingsMap.aboutStrengths) {
        try {
          setStrengths(JSON.parse(settingsMap.aboutStrengths));
        } catch {
          setStrengths(defaultStrengths);
        }
      } else {
        setStrengths(defaultStrengths);
      }

      if (settingsMap.aboutFocusAreas) {
        try {
          setFocusAreas(JSON.parse(settingsMap.aboutFocusAreas));
        } catch {
          setFocusAreas(defaultFocusAreas);
        }
      } else {
        setFocusAreas(defaultFocusAreas);
      }
      
      if (settingsMap.aboutHeading) {
        setAboutHeading(settingsMap.aboutHeading);
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Error loading settings', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setToast(null);
    try {
      await api.post('/settings', { key: 'aboutStrengths', value: JSON.stringify(strengths) });
      await api.post('/settings', { key: 'aboutFocusAreas', value: JSON.stringify(focusAreas) });
      await api.post('/settings', { key: 'aboutHeading', value: aboutHeading });
      
      setToast({ message: 'About page content updated successfully!', type: 'success' });
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to update about content', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddStrength = () => {
    if (!newStrength.trim()) return;
    setStrengths([...strengths, newStrength]);
    setNewStrength('');
  };

  const handleRemoveStrength = (index: number) => {
    setStrengths(strengths.filter((_, i) => i !== index));
  };

  const handleAddFocusArea = () => {
    if (!newFocusArea.title.trim() || !newFocusArea.detail.trim() || !newFocusArea.icon.trim()) return;
    if (editingFocusIndex !== null) {
      const updated = [...focusAreas];
      updated[editingFocusIndex] = newFocusArea;
      setFocusAreas(updated);
      setEditingFocusIndex(null);
    } else {
      setFocusAreas([...focusAreas, newFocusArea]);
    }
    setNewFocusArea({ icon: 'Code2', title: '', detail: '' });
  };

  const handleEditFocusArea = (index: number) => {
    setNewFocusArea(focusAreas[index]);
    setEditingFocusIndex(index);
  };

  const handleRemoveFocusArea = (index: number) => {
    setFocusAreas(focusAreas.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage About Page</h2>
          <p className="text-slate-400 mt-1">Update your strengths and professional focus areas</p>
        </div>
      </div>

      {toast && (
        <div className={`p-4 rounded-xl ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-accent rounded-full"></span>
            Main Heading
          </h3>
          <input 
            type="text" 
            value={aboutHeading} 
            onChange={e => setAboutHeading(e.target.value)} 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
            placeholder="e.g. Building systems with clarity and impact"
            required
          />
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Key Strengths
          </h3>
          
          <div className="space-y-4 mb-6">
            <AnimatePresence>
              {strengths.map((str, idx) => (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  key={idx} 
                  className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-800"
                >
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                  <p className="flex-1 text-slate-300">{str}</p>
                  <button type="button" onClick={() => handleRemoveStrength(idx)} className="p-2 text-slate-500 hover:text-red-500 hover:bg-slate-800 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex gap-3">
            <input 
              type="text" 
              value={newStrength} 
              onChange={e => setNewStrength(e.target.value)} 
              placeholder="E.g., Clear communication and reliable delivery"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
            />
            <button type="button" onClick={handleAddStrength} className="px-4 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2">
              <Plus size={18} /> Add
            </button>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
            Focus Areas
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <AnimatePresence>
              {focusAreas.map((area, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={idx} 
                  className="bg-slate-800/30 p-5 rounded-2xl border border-slate-800 relative group"
                >
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => handleEditFocusArea(idx)} className="p-1.5 bg-slate-800 text-slate-300 rounded-lg hover:text-white transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button type="button" onClick={() => handleRemoveFocusArea(idx)} className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium border border-primary/20">
                      Icon: {area.icon}
                    </span>
                    <h4 className="font-semibold text-white">{area.title}</h4>
                  </div>
                  <p className="text-sm text-slate-400">{area.detail}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-sm font-medium text-slate-400 mb-4">{editingFocusIndex !== null ? 'Edit Focus Area' : 'Add New Focus Area'}</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
                <input 
                  type="text" 
                  value={newFocusArea.title} 
                  onChange={e => setNewFocusArea({...newFocusArea, title: e.target.value})} 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-white"
                  placeholder="e.g. Web Applications"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Icon (Lucide name)</label>
                <input 
                  type="text" 
                  value={newFocusArea.icon} 
                  onChange={e => setNewFocusArea({...newFocusArea, icon: e.target.value})} 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-white"
                  placeholder="e.g. Code2, Database, Cpu"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1">Detail</label>
                <textarea 
                  value={newFocusArea.detail} 
                  onChange={e => setNewFocusArea({...newFocusArea, detail: e.target.value})} 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-white h-24 resize-none"
                  placeholder="Short description..."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              {editingFocusIndex !== null && (
                <button type="button" onClick={() => { setEditingFocusIndex(null); setNewFocusArea({ icon: 'Code2', title: '', detail: '' }); }} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors text-sm">
                  Cancel
                </button>
              )}
              <button type="button" onClick={handleAddFocusArea} className="px-5 py-2 bg-primary/20 text-primary border border-primary/30 rounded-xl hover:bg-primary/30 transition-colors text-sm font-medium flex items-center gap-2">
                {editingFocusIndex !== null ? <Check size={16} /> : <Plus size={16} />} 
                {editingFocusIndex !== null ? 'Update Area' : 'Add Area'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
           <button type="submit" disabled={isSaving} className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
             {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save About Page
           </button>
        </div>
      </form>
    </div>
  );
};
