import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, Loader2, MessageSquare, Copy, Check, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSendMessage } from '../hooks/useMessages';
import { useSettingsStore } from '../stores/useSettingsStore';
import { usePopSound } from '../hooks/usePopSound';

export const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { mutate: sendMessage, isPending, isSuccess, isError } = useSendMessage();
  const { getSetting } = useSettingsStore();
  const playPop = usePopSound();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = getSetting('email', 'belstyilkal@gmail.com');
  const location = getSetting('location', 'Bahir Dar, Ethiopia');
  const telegram = getSetting('telegramUrl', 'https://t.me/manchilot123');

  const copyEmail = async () => {
    playPop();
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = (data: any) => {
    sendMessage(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="py-4 sm:py-8 space-y-8 sm:space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 text-xs sm:text-sm font-medium">
          <MessageSquare size={16} />
          <span>Let&apos;s Connect</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text">
          Get In{' '}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-3"></div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted mt-4 leading-relaxed">
          Have an upcoming project, engineering role, or freelance inquiry? Reach out and I&apos;ll get back to you promptly.
        </p>
      </motion.div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
        
        {/* Left Column: Direct Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-4 sm:space-y-6"
        >
          {/* Email Card */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border dark:border-border-dark flex flex-col justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <Mail size={22} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-text">Direct Email</h3>
                <p className="text-text-muted text-xs sm:text-sm mt-0.5">Project proposals & opportunities</p>
                <a 
                  href={`mailto:${email}`} 
                  className="text-primary hover:underline font-semibold text-xs sm:text-sm block mt-1 truncate"
                >
                  {email}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={copyEmail}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-text text-xs font-semibold transition-colors border border-border/60 dark:border-border-dark/60"
            >
              {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
            </button>
          </div>

          {/* Location Card */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border dark:border-border-dark flex items-start gap-3.5">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-text">Location & Timezone</h3>
              <p className="text-text-muted text-xs sm:text-sm mt-0.5">Remote worldwide · Hybrid / Local</p>
              <p className="font-semibold text-xs sm:text-sm text-text mt-1">{location} (GMT+3)</p>
            </div>
          </div>

          {/* Telegram / Instant Messenger Card */}
          {telegram && (
            <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border dark:border-border-dark flex flex-col gap-3">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-[#26A5E4]/10 text-[#26A5E4] rounded-xl shrink-0">
                  <Send size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-text">Instant Chat</h3>
                  <p className="text-text-muted text-xs sm:text-sm mt-0.5">Fastest response on Telegram</p>
                </div>
              </div>

              <a 
                href={telegram} 
                target="_blank" 
                rel="noreferrer" 
                onClick={playPop}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#26A5E4]/15 hover:bg-[#26A5E4]/25 text-[#26A5E4] text-xs font-bold transition-colors"
              >
                <span>Message on Telegram</span>
                <Send size={14} />
              </a>
            </div>
          )}

          {/* SLA Pill */}
          <div className="px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-border/80 dark:border-border-dark/80 flex items-center gap-2.5 text-xs text-text-muted">
            <Clock size={16} className="text-primary shrink-0" />
            <span>Average response time: within 24 hours</span>
          </div>
        </motion.div>

        {/* Right Column: Interactive Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-3 glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative overflow-hidden border border-border dark:border-border-dark"
        >
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-text mb-6">Send Me a Message</h2>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-3 min-h-[320px]"
            >
              <CheckCircle2 size={48} />
              <h3 className="font-bold text-xl text-text">Message Received!</h3>
              <p className="text-xs sm:text-sm text-text-muted max-w-sm">
                Thank you for reaching out. I have received your message and will reply to your email shortly.
              </p>
            </motion.div>
          ) : (
            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-semibold text-text-muted" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: true })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-border dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text text-sm sm:text-base placeholder-text-muted/60"
                    placeholder="Jane Doe"
                  />
                  {errors.name && <span className="text-xs text-red-500">Name is required</span>}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-semibold text-text-muted" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { required: true })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-border dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text text-sm sm:text-base placeholder-text-muted/60"
                    placeholder="jane@example.com"
                  />
                  {errors.email && <span className="text-xs text-red-500">Valid email is required</span>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-text-muted" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: true })}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-border dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text text-sm sm:text-base placeholder-text-muted/60"
                  placeholder="Project inquiry or full-stack opportunity"
                />
                {errors.subject && <span className="text-xs text-red-500">Subject is required</span>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-text-muted" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message', { required: true })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-border dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-text text-sm sm:text-base placeholder-text-muted/60 resize-none"
                  placeholder="Tell me about your project, timeline, or requirements..."
                ></textarea>
                {errors.message && <span className="text-xs text-red-500">Message is required</span>}
              </div>

              {isError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-xs sm:text-sm text-center">
                  Could not send message. Please email me directly at {email}.
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                <span>{isPending ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
