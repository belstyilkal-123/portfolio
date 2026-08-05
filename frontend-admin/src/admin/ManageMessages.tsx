import React from 'react';
import { useAdminMessages, useMarkMessageRead } from '../hooks/useAdmin';
import { MailOpen, Loader2 } from 'lucide-react';

export const ManageMessages: React.FC = () => {
  const { data: messages, isPending: isLoading, isError } = useAdminMessages();
  const { mutate: markAsRead } = useMarkMessageRead();

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500 glass-panel rounded-xl">
        <p>Failed to load messages. Please ensure you are logged in and the API is running.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Contact Messages</h1>

      {messages?.length === 0 ? (
        <div className="glass-panel p-12 text-center text-text-muted rounded-2xl">
          <MailOpen size={48} className="mx-auto mb-4 opacity-50" />
          <p>No messages yet. Your inbox is clear!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages?.map((msg: any) => (
            <div key={msg._id} className={`p-6 rounded-2xl border transition-all ${msg.isRead ? 'bg-surface dark:bg-surface-dark border-border dark:border-border-dark opacity-75' : 'bg-white dark:bg-zinc-800 border-primary/30 shadow-md'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    {!msg.isRead && <span className="w-2 h-2 rounded-full bg-primary"></span>}
                    {msg.subject}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">From: <span className="font-medium text-text">{msg.name}</span> ({msg.email})</p>
                </div>
                <div className="text-xs text-text-muted">{new Date(msg.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl text-text-muted mb-4">{msg.message}</div>
              {!msg.isRead && (
                <div className="flex justify-end">
                  <button onClick={() => markAsRead(msg._id)} className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-lg text-sm font-medium transition-colors">
                    Mark as Read
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
