import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Briefcase' },
  color: { type: String, default: 'bg-primary' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Timeline = mongoose.model('Timeline', timelineSchema);
export default Timeline;
