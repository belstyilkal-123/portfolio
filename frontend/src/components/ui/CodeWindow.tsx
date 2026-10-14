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
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 dark:border-zinc-700 bg-[#1E1E1E] my-6 sm:my-8 group">
      {/* Window Header */}
      <div className="relative flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#252526] border-b border-zinc-800">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
        </div>
        
        {filename && (
          <div className="text-[11px] sm:text-xs text-zinc-400 font-mono tracking-wider truncate px-2 text-center">
            {filename}
          </div>
        )}

        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded bg-zinc-800/60 sm:bg-transparent hover:bg-zinc-800 opacity-100 sm:opacity-80 sm:hover:opacity-100 shrink-0"
          aria-label="Copy code to clipboard"
        >
          {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
          <span className="text-[11px] sm:text-xs font-medium">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Area */}
      <div className="p-3.5 sm:p-5 md:p-6 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-zinc-300">
        <pre className="tab-size-2">
          <code>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};
