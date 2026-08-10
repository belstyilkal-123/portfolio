import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'], required: true },
  icon: { type: String }, // URL or icon name
  proficiency: { type: Number, min: 1, max: 100, default: 50 },
  yearsOfExperience: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
