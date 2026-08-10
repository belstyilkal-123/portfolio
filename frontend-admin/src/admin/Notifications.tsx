import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader2, Save, Bell, Mail } from 'lucide-react';

export const Notifications: React.FC = () => {
  const [notifyOnMessage, setNotifyOnMessage] = useState(true);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      const settingsMap = (res.data || []).reduce((acc: any, s: any) => {
        acc[s.key] = s.value;
        return acc;
      }, {});
      
      setNotifyOnMessage(settingsMap.notify_on_message !== 'false');
      setNotificationEmail(settingsMap.notification_email || '');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setToast(null);
    
    try {
      await Promise.all([
        api.post('/settings', { key: 'notify_on_message', value: notifyOnMessage.toString() }),
        api.post('/settings', { key: 'notification_email', value: notificationEmail })
      ]);
      setToast({ message: 'Preferences saved', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      console.error(error);
      setToast({ message: 'Error saving preferences', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestEmail = async () => {
    await handleSubmit(); // ensure latest email is saved
    setToast({ message: 'Test email sent! (Simulated)', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-text-muted text-sm mt-1">Manage email alerts and system notifications.</p>
        </div>
      </div>

      {toast && (
        <div className={`mb-6 p-4 rounded-xl flex items-center ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
          {toast.message}
        </div>
      )}

      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-border dark:border-border-dark">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-primary/10 text-primary rounded-xl"><Bell size={24} /></div>
             <div>
               <h3 className="font-semibold">New Message Alerts</h3>
               <p className="text-sm text-text-muted">Receive an email when someone sends you a message.</p>
             </div>
          </div>
          <button onClick={() => setNotifyOnMessage(!notifyOnMessage)} className={`w-12 h-6 rounded-full transition-colors relative ${notifyOnMessage ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-600'}`}>
             <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifyOnMessage ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
           <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">Notification Email Address</label>
              <div className="flex gap-4">
                 <input type="email" value={notificationEmail} onChange={(e) => setNotificationEmail(e.target.value)} required placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text" />
                 <button type="button" onClick={handleTestEmail} className="px-4 py-3 border border-border text-text-muted rounded-xl hover:text-text hover:border-primary transition-all flex items-center gap-2 whitespace-nowrap">
                    <Mail size={16} /> Test
                 </button>
              </div>
              <p className="text-xs text-text-muted mt-1">Alerts will be sent to this email regardless of your public profile email.</p>
           </div>
           
           <div className="flex justify-end pt-4">
              <button type="submit" disabled={isSaving} className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Preferences
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};
