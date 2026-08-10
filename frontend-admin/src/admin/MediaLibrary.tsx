import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader2, Copy, Trash2, UploadCloud, Image as ImageIcon } from 'lucide-react';

export const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadUrl, setUploadUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await api.get('/media');
      setMedia(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl) return;
    setIsUploading(true);
    try {
      await api.post('/media/upload', { fileUrl: uploadUrl, folder: 'portfolio' });
      setUploadUrl('');
      fetchMedia();
    } catch (error) {
      console.error(error);
      alert('Error uploading media');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (public_id: string) => {
    if (window.confirm('Delete this image permanently?')) {
      try {
        // Since public_id contains slashes, we might need to encode it
        await api.delete(`/media/${encodeURIComponent(public_id)}`);
        fetchMedia();
      } catch (error) {
        console.error(error);
        alert('Error deleting image');
      }
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    // Could add a small local toast here if preferred
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const filteredMedia = filter === 'portfolio' 
    ? media.filter(m => m.public_id && m.public_id.startsWith('portfolio/'))
    : media;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-text-muted text-sm mt-1">Manage images used across your site.</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl mb-8 border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><UploadCloud size={20} /> Upload from URL</h3>
        <form onSubmit={handleUpload} className="flex gap-4">
          <input value={uploadUrl} onChange={(e) => setUploadUrl(e.target.value)} placeholder="https://example.com/image.png" required className="flex-1 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
          <button type="submit" disabled={isUploading} className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 shrink-0">
            {isUploading ? <Loader2 className="animate-spin" size={18} /> : 'Upload'}
          </button>
        </form>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text'}`}>All Media</button>
        <button onClick={() => setFilter('portfolio')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'portfolio' ? 'bg-primary text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-text-muted hover:text-text'}`}>Portfolio Folder</button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>
      ) : filteredMedia.length === 0 ? (
        <div className="glass-panel p-12 text-center text-text-muted rounded-2xl border border-border dark:border-border-dark flex flex-col items-center">
          <ImageIcon size={48} className="mb-4 opacity-20" />
          <p className="text-xl font-semibold mb-2">No media found</p>
          <p>Upload some images to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div key={item.public_id} className="glass-panel rounded-2xl border border-border dark:border-border-dark overflow-hidden group">
              <div className="h-40 bg-zinc-100 dark:bg-zinc-900 relative">
                <img src={item.secure_url} alt={item.filename || 'media'} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                   <button onClick={() => handleCopy(item.secure_url)} className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-sm transition-colors" title="Copy URL"><Copy size={18} /></button>
                   <button onClick={() => handleDelete(item.public_id)} className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg backdrop-blur-sm transition-colors" title="Delete"><Trash2 size={18} /></button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium truncate text-text">{item.filename || item.public_id.split('/').pop()}</p>
                <div className="flex justify-between mt-1 text-[10px] text-text-muted">
                  <span>{item.format?.toUpperCase() || 'IMG'}</span>
                  <span>{formatSize(item.bytes)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
