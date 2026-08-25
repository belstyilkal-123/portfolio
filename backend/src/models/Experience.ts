import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    timeline: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true, default: 'Briefcase' },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
