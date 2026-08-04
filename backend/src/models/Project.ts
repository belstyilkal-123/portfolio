import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: [{ type: String, required: true }],
    features: [{ type: String }],
    githubUrl: { type: String },
    liveUrl: { type: String },
    imageUrl: { type: String }, // For phase 4/5 gallery
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
