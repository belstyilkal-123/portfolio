import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  coverImage: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [{ type: String }],
  tags: [{ type: String }],
  readingTime: { type: Number },
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
