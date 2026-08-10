import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  company: { type: String },
  avatar: { type: String },
  quote: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  isVisible: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
