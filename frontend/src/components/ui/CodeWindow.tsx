import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { usePopSound } from '../../hooks/usePopSound';

interface CodeWindowProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({ code, language: _language = 'typescript', filename }) => {
  const [copied, setCopied] = useState(false);
  const playPop = usePopSound();

  const handleCopy = async () => {
    playPop();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-zinc-800 dark:border-zinc-700 bg-[#1E1E1E] my-8 group">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2D2D2D] border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
        </div>
        
        {filename && (
          <div className="text-xs text-zinc-400 font-mono tracking-wider absolute left-1/2 -translate-x-1/2">
            {filename}
          </div>
        )}

        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
          <span className="text-xs font-medium">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 md:p-6 overflow-x-auto text-sm font-mono leading-relaxed text-zinc-300">
        <pre>
          <code>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};
