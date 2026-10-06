import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '🏆' },
  color: { type: String, default: 'from-emerald-500 to-teal-400' },
  badge: { type: String },
  year: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;
