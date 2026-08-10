import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader2, Link as LinkIcon, FileText, Settings, UploadCloud } from 'lucide-react';

export const ManageResume: React.FC = () => {
  const [resumeUrl, setResumeUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [resumeVisible, setResumeVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resumeRes, settingsRes] = await Promise.all([
        api.get('/resume'),
        api.get('/settings')
      ]);
      if (resumeRes.data && resumeRes.data.url) {
        setResumeUrl(resumeRes.data.url);
      }
      
      const visibleSetting = (settingsRes.data || []).find((s: any) => s.key === 'resume_visible');
      if (visibleSetting) {
        setResumeVisible(visibleSetting.value === 'true' || visibleSetting.value === true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl) return;
    setIsSaving(true);
    try {
      const res = await api.post('/resume/upload', { fileUrl });
      if (res.data && res.data.url) {
         setResumeUrl(res.data.url);
      }
      setFileUrl('');
      alert('Resume updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating resume');
    } finally {
      setIsSaving(false);
    }
  };

  const handleVisibilityToggle = async () => {
    const newValue = !resumeVisible;
    setResumeVisible(newValue);
    try {
      await api.post('/settings', { key: 'resume_visible', value: newValue.toString() });
    } catch (error) {
      console.error(error);
      setResumeVisible(!newValue); // revert
      alert('Error updating setting');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeUrl);
    alert('Copied to clipboard!');
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Manage Resume</h1>
          <p className="text-text-muted text-sm mt-1">Upload and manage your CV/Resume.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><UploadCloud size={20} /> Update Resume</h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Direct PDF URL</label>
                <input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="https://..." required className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text" />
              </div>
              <button type="submit" disabled={isSaving} className="w-full px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                {isSaving ? <Loader2 className="animate-spin" size={16} /> : 'Set as Active'}
              </button>
            </form>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Settings size={20} /> Settings</h3>
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
              <span className="text-sm font-medium">Show download button</span>
              <button onClick={handleVisibilityToggle} className={`w-11 h-6 rounded-full transition-colors relative ${resumeVisible ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-600'}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${resumeVisible ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
          
          {resumeUrl && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><LinkIcon size={20} /> Current Resume</h3>
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl flex items-center justify-between overflow-hidden">
                <span className="text-sm truncate mr-2">{resumeUrl}</span>
                <button onClick={handleCopy} className="p-2 text-primary hover:bg-primary/10 rounded-lg flex-shrink-0">
                  <FileText size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FileText size={20} /> Preview</h3>
            {resumeUrl ? (
              <iframe src={resumeUrl} className="w-full h-[600px] rounded-xl border border-border dark:border-border-dark flex-1" title="Resume Preview" />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-text-muted p-12 border-2 border-dashed border-border dark:border-border-dark rounded-xl h-[600px]">
                <FileText size={48} className="mb-4 opacity-20" />
                <p>No active resume to preview.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
