import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: String, required: true },
  type: { type: String, required: true },
  icon: { type: String, default: 'FileText' },
  iconColor: { type: String, default: 'text-primary' },
  iconBg: { type: String, default: 'bg-primary/10' },
  badge: { type: String },
  badgeColor: { type: String },
  url: { type: String, required: true },
  fileName: { type: String, required: true },
  updatedAt: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Download = mongoose.model('Download', downloadSchema);
export default Download;
