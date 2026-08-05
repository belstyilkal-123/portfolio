import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { useDeleteProject, useCreateProject, useUpdateProject } from '../hooks/useAdmin';
import { Plus, Trash2, Loader2, ExternalLink, Edit3 } from 'lucide-react';
import { GithubIcon } from '../components/icons';

export const ManageProjects: React.FC = () => {
  const { data: apiProjects, isPending: isLoading } = useProjects();
  const { mutate: deleteProject } = useDeleteProject();
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const [isAdding, setIsAdding] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tech, setTech] = useState('');
  const [features, setFeatures] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const projects = apiProjects ?? [];

  const resetForm = () => {
    setEditingProjectId(null);
    setTitle('');
    setDescription('');
    setTech('');
    setFeatures('');
    setGithubUrl('');
    setLiveUrl('');
    setImageUrl('');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      tech: tech.split(',').map((item) => item.trim()).filter(Boolean),
      features: features.split(',').map((item) => item.trim()).filter(Boolean),
      githubUrl,
      liveUrl,
      imageUrl,
    };

    if (editingProjectId) {
      updateProject(
        { id: editingProjectId, projectData: payload },
        {
          onSuccess: () => {
            setIsAdding(false);
            resetForm();
          },
        }
      );
      return;
    }

    createProject(payload, {
      onSuccess: () => {
        setIsAdding(false);
        resetForm();
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <button 
          onClick={() => {
            if (isAdding) {
              resetForm();
            }
            setIsAdding(!isAdding);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={18} /> {isAdding ? 'Close' : 'Add Project'}
        </button>
      </div>

      {isAdding && (
        <div className="glass-panel p-6 rounded-2xl mb-8 border border-white/10">
          <h2 className="text-lg font-semibold mb-4">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted" htmlFor="project-title">Project Name</label>
                <input
                  id="project-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text"
                  placeholder="Project title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted" htmlFor="project-description">Description</label>
                <textarea
                  id="project-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text resize-none"
                  placeholder="Short project overview"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted" htmlFor="project-tech">Tech stack</label>
                  <input
                    id="project-tech"
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text"
                    placeholder="React, Node, TypeScript"
                  />
                  <p className="text-xs text-text-muted">Comma-separated list of tech used.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted" htmlFor="project-features">Key features</label>
                  <input
                    id="project-features"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text"
                    placeholder="Auth, dashboard, API"
                  />
                  <p className="text-xs text-text-muted">Optional comma-separated features.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted" htmlFor="project-github">GitHub URL</label>
                  <input
                    id="project-github"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text"
                    placeholder="https://github.com/username/project"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-muted" htmlFor="project-live">Live URL</label>
                  <input
                    id="project-live"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text"
                    placeholder="https://project.example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted" htmlFor="project-image">Image URL</label>
                <input
                  id="project-image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-text"
                  placeholder="https://.../project-image.png"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-border dark:border-border-dark">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  resetForm();
                }}
                className="px-4 py-3 rounded-xl border border-border text-text-muted hover:border-primary hover:text-text transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2"
              >
                {(isCreating || isUpdating) ? <Loader2 className="animate-spin" size={16} /> : editingProjectId ? 'Update Project' : 'Save Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-border dark:border-border-dark">
          <p className="text-xl font-semibold mb-2">No projects found</p>
          <p className="text-text-muted">Create a project to populate your portfolio CMS.</p>
        </div>
      ) : (
        <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-border dark:border-border-dark">
                <th className="p-4 font-semibold text-sm">Project Title</th>
                <th className="p-4 font-semibold text-sm">Tech Stack</th>
                <th className="p-4 font-semibold text-sm">Links</th>
                <th className="p-4 font-semibold text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: any, idx: number) => (
                <tr key={project._id || idx} className="border-b border-border dark:border-border-dark hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4 font-medium">{project.title}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((t: string, i: number) => (
                         <span key={i} className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-md">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap justify-start gap-2">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-700 bg-zinc-100 rounded-full hover:bg-zinc-200 dark:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
                        >
                          <GithubIcon size={14} /> GitHub
                        </a>
                      ) : null}
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-700 bg-zinc-100 rounded-full hover:bg-zinc-200 dark:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
                        >
                          <ExternalLink size={14} /> Live
                        </a>
                      ) : null}
                      {!project.githubUrl && !project.liveUrl ? (
                        <span className="text-xs text-text-muted">No links</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="p-4 text-right flex justify-end items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (!project._id) return;
                        setEditingProjectId(project._id);
                        setTitle(project.title || '');
                        setDescription(project.description || '');
                        setTech((project.tech || []).join(', '));
                        setFeatures((project.features || []).join(', '));
                        setGithubUrl(project.githubUrl || '');
                        setLiveUrl(project.liveUrl || '');
                        setImageUrl(project.imageUrl || '');
                        setIsAdding(true);
                      }}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit Project"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => project._id && deleteProject(project._id)}
                      disabled={!project._id}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title={!project._id ? "Cannot delete local fallback data" : "Delete Project"}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
