import { Request, Response } from 'express';
import Project from '../models/Project';

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
  res.json(projects);
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req: Request, res: Response): Promise<void> => {
  const { title, description, tech, features, githubUrl, liveUrl, imageUrl } = req.body;

  const project = new Project({
    title,
    description,
    tech,
    features,
    githubUrl,
    liveUrl,
    imageUrl,
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { title, description, tech, features, githubUrl, liveUrl, imageUrl } = req.body;

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }

  project.title = title;
  project.description = description;
  project.tech = tech;
  project.features = features;
  project.githubUrl = githubUrl;
  project.liveUrl = liveUrl;
  project.imageUrl = imageUrl;

  const updatedProject = await project.save();
  res.json(updatedProject);
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
};
