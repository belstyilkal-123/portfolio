import React from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../hooks/useProjects';
import { Loader2 } from 'lucide-react';
import { ProjectCard } from '../components/ui/ProjectCard';

export const Projects: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const { data: projectsData, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  if (!projectsData || projectsData.length === 0) {
    return (
      <div className="py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Featured Projects</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="text-text-muted mt-6 max-w-2xl mx-auto">
            No projects are available yet. Add projects from the admin portal to populate this page.
          </p>
        </motion.div>
        <div className="glass-panel rounded-3xl p-12 border border-border dark:border-border-dark text-center text-text-muted">
          <p className="text-xl font-semibold mb-2">No live projects found</p>
          <p>Add a project using the admin dashboard and refresh to view it here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Featured Projects</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        <p className="text-text-muted mt-6 max-w-2xl mx-auto">
          A showcase of systems I have designed and delivered with a strong focus on reliability, usability, and scalability.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {projectsData?.map((project, idx) => {
          const codeUrl = project.githubUrl && project.githubUrl !== '#' ? project.githubUrl : undefined;
          const liveUrl = project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : undefined;

          return (
            <ProjectCard
              key={project._id || idx}
              index={idx}
              title={project.title}
              description={project.description}
              tags={project.tech ?? []}
              githubUrl={codeUrl}
              liveUrl={liveUrl}
              imageUrl={project.imageUrl}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
