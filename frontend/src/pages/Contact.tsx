import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useForm } from 'react-hook-form';
import { useSendMessage } from '../hooks/useMessages';

export const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { mutate: sendMessage, isPending, isSuccess, isError } = useSendMessage();

  const onSubmit = (data: any) => {
    sendMessage(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        <p className="text-text-muted mt-6 max-w-2xl mx-auto">
          Have a project idea or need a reliable developer? Reach out and I&apos;ll respond quickly with a clear plan.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="glass p-6 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Email</h3>
              <p className="text-text-muted text-sm mb-2">Professional inquiries and project requests.</p>
              <a href={`mailto:${personalInfo.email}`} className="text-primary hover:underline font-medium">
                {personalInfo.email}
              </a>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Location</h3>
              <p className="text-text-muted text-sm mb-2">Available for remote, hybrid, and local work.</p>
              <span className="font-medium">{personalInfo.location}</span>
            </div>
          </div>

          {personalInfo.telegram && (
            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-accent/10 text-accent rounded-xl shrink-0">
                <Send size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Instant contact</h3>
                <p className="text-text-muted text-sm mb-2">Quick updates and follow-ups on Telegram.</p>
                <a href={personalInfo.telegram} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                  Send a message
                </a>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3 glass-panel p-8 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 h-[300px]"
            >
              <CheckCircle2 size={48} />
              <div>
                <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-sm">Thank you for reaching out. I usually reply within 24 hours.</p>
              </div>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: true })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text"
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-xs text-red-500">Name is required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted" htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { required: true })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text"
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-xs text-red-500">Email is required</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: true })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text"
                  placeholder="Project request or opportunity"
                />
                {errors.subject && <span className="text-xs text-red-500">Subject is required</span>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message', { required: true })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text resize-none"
                  placeholder="Write your message here..."
                ></textarea>
                {errors.message && <span className="text-xs text-red-500">Message is required</span>}
              </div>

              {isError && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                  Something went wrong while sending your message. Please try again.
                </div>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                {isPending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
